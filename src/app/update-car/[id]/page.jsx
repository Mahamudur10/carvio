// app/update-car/[id]/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    FieldError,
    Input,
    Label,
    TextField,
    Select,
    ListBox,
    TextArea,
    Button,
    Card
} from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';

const UpdateCarPage = ({ params }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [user, setUser] = useState(null);
    const [car, setCar] = useState(null);
    const [carId, setCarId] = useState(null);

    // Get car ID from params
    useEffect(() => {
        const getId = async () => {
            const { id } = await params;
            setCarId(id);
        };
        getId();
    }, [params]);

    // Check authentication
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    // Fetch car data
    useEffect(() => {
        if (carId && user) {
            fetchCarData();
        }
    }, [carId, user]);

    const fetchCarData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${carId}`);
            const data = await res.json();

            // Check if car belongs to logged in user
            if (data.ownerEmail !== user?.email) {
                toast.error('You are not authorized to edit this car');
                router.push('/my-added-cars');
                return;
            }

            setCar(data);
        } catch (error) {
            console.error('Error fetching car:', error);
            toast.error('Failed to load car data');
            router.push('/my-added-cars');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const updatedCar = {
            carName: formData.get('carName'),
            dailyRentPrice: formData.get('dailyRentPrice'),
            carType: formData.get('carType'),
            imageUrl: formData.get('imageUrl'),
            seatCapacity: formData.get('seatCapacity'),
            pickupLocation: formData.get('pickupLocation'),
            description: formData.get('description'),
            availabilityStatus: formData.get('availabilityStatus'),
            ownerEmail: user.email,
            ownerName: user.name,
            updatedAt: new Date()
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${carId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCar)
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Car updated successfully!');
                setTimeout(() => {
                    router.push('/my-added-cars');
                }, 1500);
            } else {
                toast.error(data.message || 'Failed to update car');
            }
        } catch (error) {
            console.error('Error updating car:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Sports', 'Convertible'];

    // Loading state
    if (fetching || !car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-t-blue-600 border-r-purple-600 border-b-indigo-600 border-l-transparent rounded-full animate-spin absolute top-0"></div>
                    </div>
                    <p className="mt-4 text-gray-600">Loading car data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-8 sm:py-12 md:py-16">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                {/* Page Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Edit Vehicle
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                        <span className="text-gray-900">Update Your</span>
                        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent ml-2 sm:ml-3">
                            Car
                        </span>
                    </h1>

                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                        Edit your car listing details
                    </p>

                    <div className="flex justify-center mt-4 sm:mt-5">
                        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full"></div>
                    </div>
                </div>

                {/* Form Card */}
                <Card className="relative overflow-hidden border-0 shadow-xl rounded-2xl sm:rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-amber-50/30"></div>

                    {/* Form Header */}
                    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-5 sm:px-6 md:px-8 py-4 sm:py-5">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-white text-lg sm:text-xl font-semibold">
                                    Edit Car Information
                                </h2>
                                <p className="text-amber-100 text-xs sm:text-sm mt-0.5">
                                    Update the details below
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="relative p-5 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

                            {/* Car Name - Full Width */}
                            <div className="md:col-span-2">
                                <TextField name="carName" isRequired defaultValue={car.carName || car.name}>
                                    <Label className="text-gray-700 font-semibold text-sm">Car Name</Label>
                                    <Input
                                        placeholder="e.g., Tesla Model 3, BMW X5"
                                        className="rounded-xl"
                                    />
                                    <FieldError />
                                </TextField>
                            </div>

                            {/* Daily Rent Price */}
                            <div>
                                <TextField name="dailyRentPrice" type="number" isRequired defaultValue={car.dailyRentPrice || car.price}>
                                    <Label className="text-gray-700 font-semibold text-sm">Daily Rent Price (৳ BDT)</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g., 5000"
                                        className="rounded-xl"
                                    />
                                    <FieldError />
                                </TextField>
                                <p className="text-xs text-gray-400 mt-1">৳ Bangladeshi Taka</p>
                            </div>

                            {/* Car Type */}
                            <div>
                                <Select
                                    name="carType"
                                    isRequired
                                    className="w-full"
                                    placeholder="Select car type"
                                    defaultSelectedKeys={[car.carType || car.type]}
                                >
                                    <Label className="text-gray-700 font-semibold text-sm">Car Type</Label>
                                    <Select.Trigger className="rounded-xl">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            {carTypes.map((type) => (
                                                <ListBox.Item key={type} id={type} textValue={type}>
                                                    {type}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Seat Capacity */}
                            <TextField name="seatCapacity" type="number" isRequired defaultValue={car.seatCapacity}>
                                <Label className="text-gray-700 font-semibold text-sm">Seat Capacity</Label>
                                <Input type="number" placeholder="e.g., 5, 7" className="rounded-xl" />
                                <FieldError />
                            </TextField>

                            {/* Pickup Location */}
                            <TextField name="pickupLocation" isRequired defaultValue={car.pickupLocation || car.location}>
                                <Label className="text-gray-700 font-semibold text-sm">Pickup Location</Label>
                                <Input placeholder="e.g., Dhaka, Chittagong" className="rounded-xl" />
                                <FieldError />
                            </TextField>

                            {/* Availability Status */}
                            <div>
                                <Select
                                    name="availabilityStatus"
                                    isRequired
                                    className="w-full"
                                    placeholder="Select status"
                                    defaultSelectedKeys={[car.availabilityStatus || car.availability]}
                                >
                                    <Label className="text-gray-700 font-semibold text-sm">Availability Status</Label>
                                    <Select.Trigger className="rounded-xl">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="Available" textValue="Available">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    Available
                                                </div>
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="Unavailable" textValue="Unavailable">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    Unavailable
                                                </div>
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Image URL - Full Width */}
                            <div className="md:col-span-2">
                                <TextField name="imageUrl" isRequired defaultValue={car.imageUrl || car.image}>
                                    <Label className="text-gray-700 font-semibold text-sm">Image URL</Label>
                                    <Input
                                        type="url"
                                        placeholder="https://example.com/car-image.jpg"
                                        className="rounded-xl"
                                    />
                                    <FieldError />
                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Use imgbb or postimage for hosting
                                    </p>
                                </TextField>
                            </div>

                            {/* Description - Full Width */}
                            <div className="md:col-span-2">
                                <TextField name="description" isRequired defaultValue={car.description}>
                                    <Label className="text-gray-700 font-semibold text-sm">Description</Label>
                                    <TextArea
                                        placeholder="Describe your car features, condition, and any special notes..."
                                        className="rounded-xl"
                                        rows={4}
                                    />
                                    <FieldError />
                                </TextField>
                            </div>
                        </div>

                        {/* Form Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                        Update Car
                                    </div>
                                )}
                            </Button>

                            <button
                                type="button"
                                onClick={() => router.push('/my-added-cars')}
                                className="px-6 py-3 sm:py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 hover:scale-[1.02] transition-all duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default UpdateCarPage;