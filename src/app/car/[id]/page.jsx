import React from 'react';
import Link from 'next/link';
import BookingModal from './BookingModal';
import { notFound } from 'next/navigation';

async function getCar(id) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    try {
        const res = await fetch(`${API_URL}/cars/${id}`, { 
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!res.ok) {
            console.error(`API returned ${res.status} for car ${id}`);
            return null;
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching car:', error);
        return null;
    }
}

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;
    const car = await getCar(id);

    if (!car || !car._id) {
        notFound();
    }

    const getAvailabilityColor = (status) => {
        return status === 'Available' 
            ? 'bg-gradient-to-r from-emerald-600 to-green-600' 
            : 'bg-gradient-to-r from-rose-600 to-red-600';
    };

    const getTypeColor = (type) => {
        const colors = {
            'Electric': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            'SUV': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'Sedan': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'Sports': 'bg-red-500/20 text-red-400 border-red-500/30',
            'Luxury': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
            'Hatchback': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            'Convertible': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
        };
        return colors[car.carType || car.type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    return (
        <div className="min-h-screen" style={{ background: '#0A0A0F' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
                
                <Link 
                    href="/explore-cars" 
                    className="inline-flex items-center gap-2 text-[#888880] hover:text-[#DAA520] mb-6 transition-colors group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Explore Cars
                </Link>
                
                <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(218,165,32,0.15)', backdropFilter: 'blur(10px)' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Left Column - Image */}
                        <div className="relative h-96 lg:h-full min-h-[400px] bg-[#0A0A0F]">
                            <img 
                                src={car.imageUrl || car.image} 
                                alt={car.carName || car.name}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute top-4 left-4 ${getAvailabilityColor(car.availabilityStatus || car.availability)} text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md`}>
                                {car.availabilityStatus || car.availability}
                            </div>
                        </div>
                        
                        {/* Right Column - Details */}
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    {car.carName || car.name}
                                </h1>
                                <span className={`px-3 py-1 rounded-md text-sm font-medium border ${getTypeColor()}`}>
                                    {car.carType || car.type}
                                </span>
                            </div>
                            
                            <div className="mb-6">
                                <p className="text-3xl md:text-4xl font-bold" style={{ color: '#DAA520' }}>
                                    ৳{car.dailyRentPrice || car.price}
                                    <span className="text-base font-normal text-[#666660]">/day</span>
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(218,165,32,0.1)' }}>
                                        <svg className="w-5 h-5" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#666660]">Seat Capacity</p>
                                        <p className="font-semibold text-white">{car.seatCapacity} Seats</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(218,165,32,0.1)' }}>
                                        <svg className="w-5 h-5" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#666660]">Pickup Location</p>
                                        <p className="font-semibold text-white">{car.pickupLocation || car.location}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                                <p className="text-[#888880] leading-relaxed">
                                    {car.description}
                                </p>
                            </div>
                            
                            <BookingModal car={car} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;