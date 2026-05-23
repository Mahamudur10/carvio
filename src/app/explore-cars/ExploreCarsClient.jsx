"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ExploreCarsClient = ({ initialCars }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [filteredCars, setFilteredCars] = useState(initialCars);

    const carTypes = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Sports', 'Convertible'];

    useEffect(() => {
        let results = initialCars;
        
        if (searchTerm) {
            results = results.filter(car => 
                (car.carName || car.name)?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (selectedType !== 'All') {
            results = results.filter(car => (car.carType || car.type) === selectedType);
        }
        
        setFilteredCars(results);
    }, [searchTerm, selectedType, initialCars]);

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
        <div className="min-h-screen" style={{ background: '#0A0A0F' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: 'rgba(218,165,32,0.1)', border: '1px solid rgba(218,165,32,0.2)' }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DAA520' }}></div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#DAA520' }}>Our Fleet</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">Explore Our</span>{' '}
                        <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #F5C842 40%, #DAA520 70%, #C8960C 100%)', WebkitBackgroundClip: 'text' }}>Cars</span>
                    </h1>
                    
                    <p className="text-[#888880] text-base max-w-2xl mx-auto">Discover our collection of premium and luxury vehicles</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }}></div>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="max-w-3xl mx-auto mb-10">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by car name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                        />
                        
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all sm:w-48"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(218,165,32,0.2)', color: 'white' }}
                        >
                            {carTypes.map(type => (
                                <option key={type} value={type} style={{ background: '#0A0A0F' }}>{type}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="text-center mt-4">
                        <p className="text-[#666660] text-sm">Found <span className="text-[#DAA520] font-semibold">{filteredCars.length}</span> cars</p>
                    </div>
                </div>

                {/* Cars Grid */}
                {filteredCars.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
                        <p className="text-[#888880]">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCars.map((car) => (
                            <div
                                key={car._id}
                                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                                style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(218,165,32,0.15)', backdropFilter: 'blur(10px)' }}
                            >
                                <div className="relative h-48 overflow-hidden bg-[#0A0A0F]">
                                    <img 
                                        src={car.imageUrl || car.image} 
                                        alt={car.carName || car.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', color: '#0A0A0F' }}>
                                        ৳{car.dailyRentPrice || car.price}<span className="text-xs">/day</span>
                                    </div>
                                    <div className={`absolute bottom-3 left-3 ${getAvailabilityColor(car.availabilityStatus || car.availability)} text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md`}>
                                        {car.availabilityStatus || car.availability}
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold transition-colors text-white group-hover:text-[#DAA520]">
                                            {car.carName || car.name}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(car.carType || car.type)}`}>
                                            {car.carType || car.type}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: '#666660' }}>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                            <span>{car.seatCapacity} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            <span>{car.pickupLocation || car.location}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-[#666660] text-sm mb-4 line-clamp-2">{car.description}</p>
                                    
                                    <Link
                                        href={`/car/${car._id}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold text-sm rounded-xl transition-all duration-200 group-hover:scale-105"
                                        style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', color: '#0A0A0F' }}
                                    >
                                        View Details
                                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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