"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';

const UpdateCarPage = ({ params }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [user, setUser] = useState(null);
    const [car, setCar] = useState(null);
    const [carId, setCarId] = useState(null);

    useEffect(() => {
        const getId = async () => {
            const { id } = await params;
            setCarId(id);
        };
        getId();
    }, [params]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    useEffect(() => {
        if (carId && user) {
            fetchCarData();
        }
    }, [carId, user]);

    const fetchCarData = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        try {
            const res = await fetch(`${API_URL}/cars/${carId}`);
            const data = await res.json();
            
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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
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
            const res = await fetch(`${API_URL}/api/cars/${carId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCar)
            });
            
            const data = await res.json();
            
            if (data.success) {
                toast.success('Car updated successfully!');
                setTimeout(() => {
                    router.push('/my-added-cars');
                }, 1500);
            } else {
                toast.error(data.error || 'Failed to update car');
            }
        } catch (error) {
            console.error('Error updating car:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Sports', 'Convertible'];

    if (fetching || !car) {
        return (
            <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full" style={{ border: '2px solid rgba(218,165,32,0.2)' }}></div>
                        <div className="w-16 h-16 rounded-full animate-spin absolute top-0" style={{ border: '2px solid transparent', borderTopColor: '#DAA520' }}></div>
                    </div>
                    <p className="mt-4 text-[#888880]">Loading car data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 sm:py-16 md:py-20" style={{ background: '#0A0A0F' }}>
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: 'rgba(218,165,32,0.1)', border: '1px solid rgba(218,165,32,0.2)' }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DAA520' }}></div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#DAA520' }}>Edit Vehicle</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">Update Your</span>{' '}
                        <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #F5C842 40%, #DAA520 70%, #C8960C 100%)', WebkitBackgroundClip: 'text' }}>Car</span>
                    </h1>
                    
                    <p className="text-[#888880] text-base">Edit your car listing details</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }}></div>
                    </div>
                </div>

                <Card className="rounded-2xl shadow-xl border-0" style={{ background: 'rgba(20,20,25,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(218,165,32,0.1)' }}>
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Car Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="carName"
                                        defaultValue={car.carName || car.name}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Daily Rent Price (৳ BDT) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="dailyRentPrice"
                                        defaultValue={car.dailyRentPrice || car.price}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Car Type <span className="text-red-500">*</span></label>
                                    <select
                                        name="carType"
                                        defaultValue={car.carType || car.type}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    >
                                        {carTypes.map(type => (
                                            <option key={type} value={type} style={{ background: '#0A0A0F' }}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Seat Capacity <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="seatCapacity"
                                        defaultValue={car.seatCapacity}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Pickup Location <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        defaultValue={car.pickupLocation || car.location}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Availability Status <span className="text-red-500">*</span></label>
                                    <select
                                        name="availabilityStatus"
                                        defaultValue={car.availabilityStatus || car.availability}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    >
                                        <option value="Available" style={{ background: '#0A0A0F' }}>Available</option>
                                        <option value="Unavailable" style={{ background: '#0A0A0F' }}>Unavailable</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Image URL <span className="text-red-500">*</span></label>
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        defaultValue={car.imageUrl || car.image}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#DAA520' }}>Description <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        defaultValue={car.description}
                                        required
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all resize-none"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                                    style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', color: '#0A0A0F' }}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-[#0A0A0F] border-t-transparent rounded-full animate-spin"></div>
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
                                    className="px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#888880' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UpdateCarPage;