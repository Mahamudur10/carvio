// app/car/[id]/page.jsx
import React from 'react';
import Link from 'next/link';
import BookingModal from './BookingModal';

async function getCar(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
        cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
}

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;
    const car = await getCar(id);

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Car not found</h1>
                    <Link href="/explore-cars" className="text-blue-600 hover:underline">
                        Back to Explore Cars
                    </Link>
                </div>
            </div>
        );
    }

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                
                {/* Back Button */}
                <Link 
                    href="/explore-cars" 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Explore Cars
                </Link>

                {/* Car Details Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Left Column - Image */}
                        <div className="relative h-96 lg:h-full min-h-[400px] bg-gray-100">
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
                            {/* Car Name & Type */}
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    {car.carName || car.name}
                                </h1>
                                <span className={`px-3 py-1 rounded-md text-sm font-medium ${getTypeColor(car.carType || car.type)}`}>
                                    {car.carType || car.type}
                                </span>
                            </div>
                            
                            {/* Price */}
                            <div className="mb-6">
                                <p className="text-3xl md:text-4xl font-bold text-blue-600">
                                    ৳{car.dailyRentPrice || car.price}
                                    <span className="text-base font-normal text-gray-500">/day</span>
                                </p>
                            </div>
                            
                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Seat Capacity</p>
                                        <p className="font-semibold text-gray-800">{car.seatCapacity} Seats</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Pickup Location</p>
                                        <p className="font-semibold text-gray-800">{car.pickupLocation || car.location}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {car.description}
                                </p>
                            </div>
                            
                            {/* Book Now Button with Modal */}
                            <BookingModal car={car} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;