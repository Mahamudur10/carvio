"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const MyBookingsPage = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        if (user?.email) {
            fetchMyBookings();
        }
    }, [user]);

    const fetchMyBookings = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
        try {
            const res = await fetch(`${API_URL}/api/my-bookings?email=${user.email}`);
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load your bookings');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isChecking) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-yellow-500/20"></div>
                        <div className="w-16 h-16 rounded-full animate-spin absolute top-0 border-2 border-t-yellow-500 border-transparent"></div>
                    </div>
                    <p className="mt-4 text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black py-12 sm:py-16 md:py-20">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">My Rentals</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">My</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Bookings</span>
                    </h1>
                    
                    <p className="text-gray-400 text-base">View and manage your car rental bookings</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-2 border-yellow-500/20"></div>
                            <div className="w-16 h-16 rounded-full animate-spin absolute top-0 border-2 border-t-yellow-500 border-transparent"></div>
                        </div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-16 bg-white/5 rounded-2xl border border-yellow-500/10">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No bookings yet</h3>
                        <p className="text-gray-400 mb-6">You haven't booked any cars yet</p>
                        <Link href="/explore-cars" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">Explore Cars</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(218,165,32,0.15)', backdropFilter: 'blur(10px)' }}>
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative md:w-64 h-48 md:h-auto overflow-hidden bg-black">
                                        <img src={booking.imageUrl || 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500'} alt={booking.carName} className="w-full h-full object-cover" />
                                        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold bg-green-600 text-white">Confirmed</div>
                                    </div>
                                    <div className="flex-1 p-5 md:p-6">
                                        <h3 className="text-xl font-bold text-white">{booking.carName}</h3>
                                        <p className="text-gray-500 text-sm mt-1">Booking ID: {booking._id.slice(-8).toUpperCase()}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                            <div><p className="text-xs text-gray-500">Booking Date</p><p className="text-sm text-white">{formatDate(booking.bookingDate)}</p></div>
                                            <div><p className="text-xs text-gray-500">Total Price</p><p className="text-sm text-yellow-500 font-bold">৳{booking.totalPrice || booking.carPrice}/day</p></div>
                                            <div><p className="text-xs text-gray-500">Pickup Location</p><p className="text-sm text-white">{booking.pickupLocation || 'Dhaka'}</p></div>
                                            <div><p className="text-xs text-gray-500">Driver Needed</p><p className="text-sm text-white">{booking.driverNeeded || 'No'}</p></div>
                                        </div>
                                        {booking.specialNote && (
                                            <div className="mt-3 p-2 bg-white/5 rounded-lg"><p className="text-xs text-gray-500">Special Note:</p><p className="text-sm text-white">{booking.specialNote}</p></div>
                                        )}
                                        <Link href={`/car/${booking.carId}`} className="inline-block mt-4 text-yellow-500 hover:text-yellow-400 text-sm">View Car Details →</Link>
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