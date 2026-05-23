"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';

const AddCarsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to add a car');
            router.push('/login');
            return;
        }
        
        setLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
        const carData = {
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
            createdAt: new Date()
        };

        console.log("Sending car data:", carData);

        try {
            const res = await fetch(`${API_URL}/cars`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });
            
            const data = await res.json();
            
            if (data.success) {
                toast.success('Car added successfully!');
                e.target.reset();
                setTimeout(() => {
                    router.push('/my-added-cars');
                }, 1500);
            } else {
                toast.error(data.error || 'Failed to add car');
            }
        } catch (error) {
            console.error('Error adding car:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Sports', 'Convertible'];

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-yellow-500/20"></div>
                        <div className="w-16 h-16 rounded-full animate-spin absolute top-0 border-2 border-t-yellow-500 border-transparent"></div>
                    </div>
                    <p className="mt-4 text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-12 sm:py-16 md:py-20">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                
                {/* Page Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">
                            List Your Vehicle
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">Add Your</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
                            Car
                        </span>
                    </h1>
                    
                    <p className="text-gray-400 text-base">Fill out the form below to list your car for rent</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                </div>

                {/* Form Card */}
                <Card className="rounded-2xl shadow-xl border-0 bg-black/50 backdrop-blur-sm border border-yellow-500/10">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Car Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="carName" 
                                        required 
                                        placeholder="e.g., Tesla Model 3, BMW X5" 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Daily Rent Price (৳ BDT) <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="dailyRentPrice" 
                                        required 
                                        placeholder="e.g., 5000" 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Car Type <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        name="carType" 
                                        required 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white"
                                    >
                                        <option value="" className="bg-black">Select Car Type</option>
                                        {carTypes.map(type => (
                                            <option key={type} value={type} className="bg-black">{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Seat Capacity <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="seatCapacity" 
                                        required 
                                        placeholder="e.g., 5, 7" 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Pickup Location <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="pickupLocation" 
                                        required 
                                        placeholder="e.g., Dhaka, Chittagong" 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Availability Status <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        name="availabilityStatus" 
                                        required 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white"
                                    >
                                        <option value="Available" className="bg-black">Available</option>
                                        <option value="Unavailable" className="bg-black">Unavailable</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Image URL <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="url" 
                                        name="imageUrl" 
                                        required 
                                        placeholder="https://example.com/car-image.jpg" 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                    />
                                    <p className="text-xs mt-1 text-gray-500">Use imgbb or postimage for hosting</p>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        name="description" 
                                        rows="4" 
                                        required 
                                        placeholder="Describe your car features, condition, and any special notes..." 
                                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                    />
                                </div>
                            </div>

                            {/* Required Fields Note */}
                            <div className="rounded-xl p-4 bg-yellow-500/5 border border-yellow-500/10">
                                <p className="text-sm flex items-center gap-2 text-yellow-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    All fields marked with <span className="text-red-500 font-bold">*</span> are required
                                </p>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
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
                    </div>
                </Card>

                {/* Tips Card */}
                <div className="mt-8 rounded-xl p-5 bg-yellow-500/5 border border-yellow-500/10">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-yellow-500/10">
                            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white text-base">Pro Tips for Listing</h3>
                            <p className="text-gray-400 text-sm mt-1">
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