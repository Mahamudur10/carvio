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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    useEffect(() => {
        if (user?.email) {
            fetchMyBookings();
        }
    }, [user]);

    const fetchMyBookings = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        try {
            const res = await fetch(`${API_URL}/api/my-bookings?email=${user.email}`);
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
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
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-screen" style={{ background: '#0A0A0F' }}>
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: 'rgba(218,165,32,0.1)', border: '1px solid rgba(218,165,32,0.2)' }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DAA520' }}></div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#DAA520' }}>My Rentals</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">My</span>{' '}
                        <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #F5C842 40%, #DAA520 70%, #C8960C 100%)', WebkitBackgroundClip: 'text' }}>Bookings</span>
                    </h1>
                    
                    <p className="text-[#888880] text-base">View and manage your car rental bookings</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }}></div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full" style={{ border: '2px solid rgba(218,165,32,0.2)' }}></div>
                            <div className="w-16 h-16 rounded-full animate-spin absolute top-0" style={{ border: '2px solid transparent', borderTopColor: '#DAA520' }}></div>
                        </div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-16 bg-white/5 rounded-2xl border border-[#DAA520]/10">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No bookings yet</h3>
                        <p className="text-[#888880] mb-6">You haven't booked any cars yet</p>
                        <Link href="/explore-cars" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', color: '#0A0A0F' }}>
                            Explore Cars
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(218,165,32,0.15)', backdropFilter: 'blur(10px)' }}>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="relative h-48 md:h-full md:min-h-[180px] bg-[#0A0A0F]">
                                        <img src={booking.imageUrl || 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500'} alt={booking.carName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-3 p-5">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{booking.carName}</h3>
                                                <p className="text-[#666660] text-sm mt-1">Booking ID: {booking._id.slice(-8)}</p>
                                            </div>
                                            <div>
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                                    Confirmed
                                                </span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-[#666660]">Booking Date</p>
                                                    <p className="text-sm font-medium text-white">{formatDate(booking.bookingDate)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-[#666660]">Total Price</p>
                                                    <p className="text-sm font-medium" style={{ color: '#DAA520' }}>৳{booking.totalPrice || booking.carPrice}/day</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-[#666660]">Pickup Location</p>
                                                    <p className="text-sm font-medium text-white">{booking.pickupLocation || 'Dhaka'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-[#666660]">Driver Needed</p>
                                                    <p className="text-sm font-medium text-white">{booking.driverNeeded || 'No'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {booking.specialNote && (
                                            <div className="bg-white/5 rounded-xl p-3 mb-4">
                                                <p className="text-xs text-[#666660] mb-1">Special Note:</p>
                                                <p className="text-sm text-white">{booking.specialNote}</p>
                                            </div>
                                        )}
                                        <Link href={`/car/${booking.carId}`} className="inline-flex items-center gap-2 text-[#DAA520] hover:text-[#F5C842] font-semibold text-sm transition-colors">
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