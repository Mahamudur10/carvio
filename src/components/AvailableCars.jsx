// components/AvailableCars.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const AvailableCars = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        fetchCars();
    }, []);

    // Real API call (backend ready)
    const fetchCars = async () => {
        try {
            const res = await fetch('http://localhost:5000/explore-cars');
            const data = await res.json();
            setCars(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setLoading(false);
        }
    };

    // Show only first 6 cars for home page
    const displayedCars = cars.slice(0, 6);

    const getTypeColor = (type) => {
        const colors = {
            'Electric': 'bg-emerald-100 text-emerald-700',
            'SUV': 'bg-blue-100 text-blue-700',
            'Sedan': 'bg-purple-100 text-purple-700',
            'Sports': 'bg-red-100 text-red-700',
            'Luxury': 'bg-amber-100 text-amber-700',
            'Hatchback': 'bg-cyan-100 text-cyan-700',
            'Convertible': 'bg-pink-100 text-pink-700'
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    const getAvailabilityColor = (status) => {
        return status === 'Available' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gradient-to-r from-red-500 to-rose-500';
    };

    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 py-1.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">
                            Our Fleet
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cars</span>
                    </h2>
                    
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Choose from our wide range of premium cars at affordable prices
                    </p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    </div>
                </div>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-t-blue-600 border-r-purple-600 border-b-indigo-600 border-l-transparent rounded-full animate-spin absolute top-0"></div>
                        </div>
                    </div>
                ) : (
                    /* Cars Grid - Minimum 6 cards */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {displayedCars.map((car, index) => (
                            <div
                                key={car._id}
                                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Car Image */}
                                <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                                    <img 
                                        src={car.imageUrl || car.image} 
                                        alt={car.carName || car.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Price Badge */}
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                                        ৳{car.dailyRentPrice || car.price}<span className="text-xs">/day</span>
                                    </div>
                                    {/* Availability Badge */}
                                    <div className={`absolute bottom-3 left-3 ${getAvailabilityColor(car.availabilityStatus || car.availability)} text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md`}>
                                        {car.availabilityStatus || car.availability}
                                    </div>
                                </div>
                                
                                {/* Car Info */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {car.carName || car.name}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(car.carType || car.type)}`}>
                                            {car.carType || car.type}
                                        </span>
                                    </div>
                                    
                                    {/* Features */}
                                    <div className="flex items-center gap-4 mb-3 text-gray-500 text-sm">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <span>{car.seatCapacity} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{car.pickupLocation || car.location}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Description */}
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {car.description}
                                    </p>
                                    
                                    {/* View Details Button */}
                                    <Link
                                        href={`/car/${car._id}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 group-hover:scale-105"
                                    >
                                        View Details
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Cars Button */}
                {!loading && cars.length > 6 && (
                    <div className="text-center mt-12">
                        <Link
                            href="/explore-cars"
                            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 group"
                        >
                            View All Cars
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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