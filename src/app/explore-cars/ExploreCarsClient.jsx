// app/explore-cars/ExploreCarsClient.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ExploreCarsClient = ({ initialCars }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [filteredCars, setFilteredCars] = useState(initialCars);

    const carTypes = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Sports', 'Convertible'];

    const getAvailabilityColor = (status) => {
        return status === 'Available' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gradient-to-r from-red-500 to-rose-500';
    };

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

    useEffect(() => {
        let results = initialCars;
        
        if (searchTerm) {
            results = results.filter(car => 
                car.carName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (selectedType !== 'All') {
            results = results.filter(car => car.carType === selectedType);
        }
        
        setFilteredCars(results);
    }, [searchTerm, selectedType, initialCars]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Page Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Our Fleet
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-gray-900">Explore Our</span>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
                            Cars
                        </span>
                    </h1>
                    
                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                        Discover our collection of premium and luxury vehicles
                    </p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 sm:mb-10">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by car name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div className="w-full sm:w-64">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                {carTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="text-center mt-4">
                        <p className="text-gray-500 text-sm">
                            Found <span className="font-semibold text-blue-600">{filteredCars.length}</span> cars
                        </p>
                    </div>
                </div>

                {/* Cars Grid */}
                {filteredCars.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No cars found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCars.map((car) => (
                            <div
                                key={car._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img 
                                        src={car.imageUrl} 
                                        alt={car.carName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                                        ৳{car.dailyRentPrice}<span className="text-xs">/day</span>
                                    </div>
                                    <div className={`absolute bottom-3 left-3 ${getAvailabilityColor(car.availabilityStatus)} text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md`}>
                                        {car.availabilityStatus}
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {car.carName}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(car.carType)}`}>
                                            {car.carType}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-3 text-gray-500 text-xs">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <span>{car.seatCapacity} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{car.pickupLocation}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                                        {car.description}
                                    </p>
                                    
                                    <Link
                                        href={`/car/${car._id}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                                    >
                                        View Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreCarsClient;