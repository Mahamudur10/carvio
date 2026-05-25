"use client";

import { useState } from 'react';
import Link from 'next/link';

const ExploreCarsClient = ({ initialCars }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [filteredCars, setFilteredCars] = useState(initialCars || []);

    const carTypes = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Sports', 'Convertible'];

    const filterCars = (term, type) => {
        let results = initialCars || [];
        if (term) {
            results = results.filter(car => 
                (car.carName || car.name)?.toLowerCase().includes(term.toLowerCase())
            );
        }
        if (type !== 'All') {
            results = results.filter(car => (car.carType || car.type) === type);
        }
        setFilteredCars(results);
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterCars(term, selectedType);
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;
        setSelectedType(type);
        filterCars(searchTerm, type);
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

    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">Our Fleet</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-white">Explore Our</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Cars</span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover our collection of premium and luxury vehicles
                    </p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search by car name..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 pl-12"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        <select
                            value={selectedType}
                            onChange={handleTypeChange}
                            className="px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all sm:w-52 bg-white/5 border border-yellow-500/20 text-white"
                        >
                            {carTypes.map(type => (
                                <option key={type} value={type} className="bg-black">{type}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="text-center mt-4">
                        <p className="text-gray-500">
                            Found <span className="text-yellow-500 font-bold text-lg">{filteredCars.length}</span> cars
                        </p>
                    </div>
                </div>

                {/* Cars Grid */}
                {filteredCars.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-7xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold text-white mb-2">No cars found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCars.map((car) => (
                            <div
                                key={car._id}
                                className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgba(20,20,25,0.9) 0%, rgba(15,15,20,0.8) 100%)',
                                    border: '1px solid rgba(218,165,32,0.15)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-black">
                                    <img 
                                        src={car.imageUrl || car.image} 
                                        alt={car.carName || car.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-bold shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">
                                        ৳{car.dailyRentPrice || car.price}<span className="text-xs">/day</span>
                                    </div>
                                    <div className={`absolute bottom-3 left-3 ${getAvailabilityColor(car.availabilityStatus || car.availability)} text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md`}>
                                        {car.availabilityStatus || car.availability}
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white group-hover:text-yellow-500 transition-colors">
                                            {car.carName || car.name}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(car.carType || car.type)}`}>
                                            {car.carType || car.type}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-3 text-gray-400 text-xs">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                            <span>{car.seatCapacity} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            <span>{car.pickupLocation || car.location}</span>
                                        </div>
                                    </div>
                                    
                                    <Link
                                        href={`/car/${car._id}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold text-sm rounded-xl transition-all duration-300 group-hover:scale-105 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:shadow-lg hover:shadow-yellow-500/25"
                                    >
                                        View Details
                                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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