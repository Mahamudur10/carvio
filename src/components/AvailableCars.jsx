// components/AvailableCars.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AvailableCars = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);

    // Dummy car data (backend ready হলে real API call হবে)
    const dummyCars = [
        {
            _id: '1',
            name: 'Tesla Model 3',
            price: 89,
            type: 'Electric',
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
            seatCapacity: 5,
            location: 'Dhaka',
            availability: 'Available',
            description: 'Premium electric sedan with autopilot feature'
        },
        {
            _id: '2',
            name: 'BMW X5',
            price: 120,
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
            seatCapacity: 7,
            location: 'Dhaka',
            availability: 'Available',
            description: 'Luxury SUV with powerful engine'
        },
        {
            _id: '3',
            name: 'Mercedes C-Class',
            price: 95,
            type: 'Sedan',
            image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500',
            seatCapacity: 5,
            location: 'Chittagong',
            availability: 'Available',
            description: 'Elegant sedan with premium comfort'
        },
        {
            _id: '4',
            name: 'Audi Q7',
            price: 135,
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
            seatCapacity: 7,
            location: 'Dhaka',
            availability: 'Unavailable',
            description: 'Spacious luxury SUV'
        },
        {
            _id: '5',
            name: 'Honda Civic',
            price: 45,
            type: 'Sedan',
            image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500',
            seatCapacity: 5,
            location: 'Dhaka',
            availability: 'Available',
            description: 'Fuel efficient and reliable'
        },
        {
            _id: '6',
            name: 'Toyota Land Cruiser',
            price: 150,
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1533473359331-fd322f9e0d8b?w=500',
            seatCapacity: 8,
            location: 'Chittagong',
            availability: 'Available',
            description: 'Off-road capable luxury SUV'
        },
        {
            _id: '7',
            name: 'Nissan GT-R',
            price: 200,
            type: 'Sports',
            image: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=500',
            seatCapacity: 4,
            location: 'Dhaka',
            availability: 'Unavailable',
            description: 'High performance sports car'
        },
        {
            _id: '8',
            name: 'Hyundai Tucson',
            price: 55,
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=500',
            seatCapacity: 5,
            location: 'Dhaka',
            availability: 'Available',
            description: 'Modern compact SUV'
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        // Backend ready হলে এখানে API call হবে
        setTimeout(() => {
            setCars(dummyCars);
            setLoading(false);
        }, 1000);
    }, []);

    // Show only first 6 cars for home page
    const displayedCars = cars.slice(0, 6);

    // Get car type badge color
    const getTypeColor = (type) => {
        const colors = {
            'Electric': 'bg-green-100 text-green-700',
            'SUV': 'bg-blue-100 text-blue-700',
            'Sedan': 'bg-purple-100 text-purple-700',
            'Sports': 'bg-red-100 text-red-700',
            'Luxury': 'bg-yellow-100 text-yellow-700'
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    // Get availability badge color
    const getAvailabilityColor = (status) => {
        return status === 'Available' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white';
    };

    return (
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Our Fleet</span>
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
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
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
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <img 
                                        src={car.image} 
                                        alt={car.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Price Badge */}
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                                        ${car.price}<span className="text-xs font-normal">/day</span>
                                    </div>
                                    {/* Availability Badge */}
                                    <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-semibold ${getAvailabilityColor(car.availability)}`}>
                                        {car.availability}
                                    </div>
                                </div>
                                
                                {/* Car Info */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {car.name}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(car.type)}`}>
                                            {car.type}
                                        </span>
                                    </div>
                                    
                                    {/* Features */}
                                    <div className="flex items-center gap-4 mb-3 text-gray-500 text-sm">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round"strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <span>{car.seatCapacity} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{car.location}</span>
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
                {!loading && (
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