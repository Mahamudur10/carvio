
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

const AddCarsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    // Check if user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to add a car');
            router.push('/login');
            return;
        }
        
        setLoading(true);
        
        const formData = new FormData(e.currentTarget);
        
        // Create car object with ownerEmail
        const car = {
            carName: formData.get('carName'),
            dailyRentPrice: formData.get('dailyRentPrice'),
            carType: formData.get('carType'),
            imageUrl: formData.get('imageUrl'),
            seatCapacity: formData.get('seatCapacity'),
            pickupLocation: formData.get('pickupLocation'),
            description: formData.get('description'),
            availabilityStatus: formData.get('availabilityStatus'),
            ownerEmail: user.email,        // 👈 ইউজারের ইমেইল যোগ করলাম
            ownerName: user.name,           // 👈 ইউজারের নাম যোগ করলাম
            createdAt: new Date()            // 👈 তৈরি করার তারিখ
        };

        console.log('Sending car:', car);

        try {
            const res = await fetch('http://localhost:5000/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            });
            
            const data = await res.json();
            console.log('Response:', data);
            
            if (data.success) {
                toast.success('Car added successfully!');
                e.target.reset(); // Reset form
                setTimeout(() => {
                    router.push('/my-added-cars');
                }, 1500);
            } else {
                toast.error(data.message || 'Failed to add car');
            }
        } catch (error) {
            console.error('Error adding car:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Sports', 'Convertible'];

    // Show loading while checking auth
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-t-blue-600 border-r-purple-600 border-b-indigo-600 border-l-transparent rounded-full animate-spin absolute top-0"></div>
                    </div>
                    <p className="mt-4 text-gray-600">Checking authentication...</p>
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
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            List Your Vehicle
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                        <span className="text-gray-900">Add Your</span>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2 sm:ml-3">
                            Car
                        </span>
                    </h1>
                    
                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                        Fill out the form below to list your car for rent
                    </p>
                    
                    <div className="flex justify-center mt-4 sm:mt-5">
                        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Form Card */}
                <Card className="relative overflow-hidden border-0 shadow-xl rounded-2xl sm:rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/30"></div>
                    
                    {/* Form Header */}
                    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 sm:px-6 md:px-8 py-4 sm:py-5">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-white text-lg sm:text-xl font-semibold">
                                    Car Information Form
                                </h2>
                                <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
                                    Please provide all the details below
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={onSubmit} className="relative p-5 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            
                            {/* Car Name - Full Width */}
                            <div className="md:col-span-2">
                                <TextField name="carName" isRequired>
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
                                <TextField name="dailyRentPrice" type="number" isRequired>
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
                            <TextField name="seatCapacity" type="number" isRequired>
                                <Label className="text-gray-700 font-semibold text-sm">Seat Capacity</Label>
                                <Input type="number" placeholder="e.g., 5, 7" className="rounded-xl" />
                                <FieldError />
                            </TextField>

                            {/* Pickup Location */}
                            <TextField name="pickupLocation" isRequired>
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
                                <TextField name="imageUrl" isRequired>
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
                                <TextField name="description" isRequired>
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

                        {/* Required Fields Note */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
                            <p className="text-amber-800 text-xs sm:text-sm flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                All fields marked with <span className="text-red-500 font-bold mx-1">*</span> are required
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3 sm:py-3.5 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Adding Car...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add Car
                                </div>
                            )}
                        </Button>
                    </form>
                </Card>

                {/* Tips Card */}
                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Pro Tips for Listing</h3>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1">
                                • Use high-quality images (minimum 1080x720 resolution)<br />
                                • Set competitive pricing based on market rates<br />
                                • Write detailed description highlighting key features
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCarsPage;