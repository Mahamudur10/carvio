"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const AvailableCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
        try {
            const res = await fetch(`${API_URL}/explore-cars`);
            const data = await res.json();
            setCars(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
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
        return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const getAvailabilityColor = (status) => {
        return status === 'Available' 
            ? 'bg-gradient-to-r from-emerald-600 to-green-600' 
            : 'bg-gradient-to-r from-rose-600 to-red-600';
    };

    if (loading) {
        return (
            <div className="bg-black py-20 text-center">
                <div className="inline-block w-12 h-12 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4">Loading premium cars...</p>
            </div>
        );
    }

    if (cars.length === 0) {
        return (
            <div className="bg-black py-20 text-center">
                <p className="text-gray-400">No cars available.</p>
            </div>
        );
    }

    const displayedCars = cars.slice(0, 6);

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">Our Fleet</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Available</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Cars</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose from our wide range of premium cars at affordable prices
                    </p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                </div>

                {/* Cars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedCars.map((car, index) => (
                        <div
                            key={car._id}
                            className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                            style={{ 
                                background: 'linear-gradient(135deg, rgba(20,20,25,0.9) 0%, rgba(15,15,20,0.8) 100%)',
                                border: '1px solid rgba(218,165,32,0.15)',
                                backdropFilter: 'blur(10px)',
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden bg-black">
                                <img 
                                    src={car.imageUrl || car.image} 
                                    alt={car.carName || car.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500';
                                    }}
                                />
                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">
                                    ৳{car.dailyRentPrice || car.price}<span className="text-xs font-normal">/day</span>
                                </div>
                                {/* Availability Badge */}
                                <div className={`absolute bottom-4 left-4 ${getAvailabilityColor(car.availabilityStatus || car.availability)} text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md backdrop-blur-sm`}>
                                    {car.availabilityStatus || car.availability}
                                </div>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold transition-colors duration-300 text-white group-hover:text-yellow-500">
                                        {car.carName || car.name}
                                    </h3>
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getTypeColor(car.carType || car.type)}`}>
                                        {car.carType || car.type}
                                    </span>
                                </div>
                                
                                {/* Features */}
                                <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span>{car.seatCapacity} Seats</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{car.pickupLocation || car.location}</span>
                                    </div>
                                </div>
                                
                                {/* Description */}
                                <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">
                                    {car.description || "Experience luxury and comfort with this premium vehicle. Perfect for your next journey."}
                                </p>
                                
                                {/* View Details Button */}
                                <Link
                                    href={`/car/${car._id}`}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl transition-all duration-300 group-hover:scale-105 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:shadow-lg hover:shadow-yellow-500/25"
                                >
                                    View Details
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                {cars.length > 6 && (
                    <div className="text-center mt-12">
                        <Link
                            href="/explore-cars"
                            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl transition-all duration-300 group border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                        >
                            View All Cars
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AvailableCars;