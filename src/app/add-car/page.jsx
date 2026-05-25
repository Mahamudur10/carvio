"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';

const AddCarsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.replace('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
        setIsChecking(false);
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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
        
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

    if (isChecking) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-yellow-500/20"></div>
                        <div className="w-16 h-16 rounded-full animate-spin absolute top-0 border-2 border-t-yellow-500 border-transparent"></div>
                    </div>
                    <p className="mt-4 text-gray-400">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black py-12 sm:py-16 md:py-20">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">List Your Vehicle</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">Add Your</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Car</span>
                    </h1>
                    
                    <p className="text-gray-400 text-base">Fill out the form below to list your car for rent</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                </div>

                <Card className="rounded-2xl shadow-xl border-0 bg-black/50 backdrop-blur-sm border border-yellow-500/20">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Car Name <span className="text-red-500">*</span></label>
                                    <input type="text" name="carName" required placeholder="Enter car name (e.g., Tesla Model 3)" className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Daily Rent Price (৳ BDT) <span className="text-red-500">*</span></label>
                                    <input type="number" name="dailyRentPrice" required placeholder="Enter daily rent price" className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Car Type <span className="text-red-500">*</span></label>
                                    <select name="carType" required className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white">
                                        <option value="" className="bg-black">Select car type</option>
                                        {carTypes.map(type => (<option key={type} value={type} className="bg-black">{type}</option>))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Seat Capacity <span className="text-red-500">*</span></label>
                                    <input type="number" name="seatCapacity" required placeholder="Enter seat capacity" className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Pickup Location <span className="text-red-500">*</span></label>
                                    <input type="text" name="pickupLocation" required placeholder="Enter pickup location" className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Availability Status <span className="text-red-500">*</span></label>
                                    <select name="availabilityStatus" required className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white">
                                        <option value="Available" className="bg-black">Available</option>
                                        <option value="Unavailable" className="bg-black">Unavailable</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Image URL <span className="text-red-500">*</span></label>
                                    <input type="url" name="imageUrl" required placeholder="Enter image URL" className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" />
                                    <p className="text-xs mt-1 text-gray-500">Use a valid image URL for the car picture</p>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-yellow-500">Description <span className="text-red-500">*</span></label>
                                    <textarea name="description" rows="4" required placeholder="Describe your car features, condition, and any special notes..." className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" />
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">
                                {loading ? "Adding Car..." : "Add Car"}
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddCarsPage;