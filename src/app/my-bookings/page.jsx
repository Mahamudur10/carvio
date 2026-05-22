// app/my-bookings/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';

const MyBookingsPage = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Get user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    // Fetch user's bookings
    useEffect(() => {
        if (user?.email) {
            fetchMyBookings();
        }
    }, [user]);

    const fetchMyBookings = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-bookings?email=${user.email}`);
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to load your bookings');
        } finally {
            setLoading(false);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-8 sm:py-12">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                
                {/* Page Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 py-1.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            My Rentals
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-gray-900">My</span>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
                            Bookings
                        </span>
                    </h1>
                    
                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                        View and manage your car rental bookings
                    </p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-t-blue-600 border-r-purple-600 border-b-indigo-600 border-l-transparent rounded-full animate-spin absolute top-0"></div>
                        </div>
                    </div>
                ) : bookings.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
                        <p className="text-gray-500 mb-6">You haven't booked any cars yet</p>
                        <Link
                            href="/explore-cars"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            Explore Cars
                        </Link>
                    </div>
                ) : (
                    /* Bookings List */
                    <div className="space-y-4">
                        {bookings.map((booking, index) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeInUp"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    
                                    {/* Car Image */}
                                    <div className="relative h-48 md:h-full md:min-h-[180px] bg-gray-100">
                                        <img 
                                            src={booking.imageUrl || 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500'}
                                            alt={booking.carName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Booking Details */}
                                    <div className="col-span-3 p-5">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {booking.carName}
                                                </h3>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    Booking ID: {booking._id.slice(-8)}
                                                </p>
                                            </div>
                                            <div className="mt-2 sm:mt-0">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                    Confirmed
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Booking Info Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-400">Booking Date</p>
                                                    <p className="text-sm font-medium">{formatDate(booking.bookingDate)}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-400">Total Price</p>
                                                    <p className="text-sm font-medium text-blue-600">৳{booking.totalPrice || booking.carPrice}/day</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-400">Pickup Location</p>
                                                    <p className="text-sm font-medium">{booking.pickupLocation || 'Dhaka'}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-400">Driver Needed</p>
                                                    <p className="text-sm font-medium">{booking.driverNeeded || 'No'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Special Note */}
                                        {booking.specialNote && (
                                            <div className="bg-gray-50 rounded-xl p-3 mb-4">
                                                <p className="text-xs text-gray-500 mb-1">Special Note:</p>
                                                <p className="text-sm text-gray-700">{booking.specialNote}</p>
                                            </div>
                                        )}
                                        
                                        {/* View Car Button */}
                                        <Link
                                            href={`/car/${booking.carId}`}
                                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                                        >
                                            View Car Details
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;