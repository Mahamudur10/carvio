"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const BookingModal = ({ car }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        driverNeeded: 'No',
        specialNote: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = () => {
        if (!user) {
            toast.error('Please login to book a car');
            setTimeout(() => {
                router.push('/login');
            }, 1500);
            return;
        }
        setIsOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to book a car');
            router.push('/login');
            return;
        }
        
        setLoading(true);
        
        const API_URL = "https://carvio-server.vercel.app";
        
        const bookingData = {
            carId: car._id,
            carName: car.carName || car.name,
            carPrice: parseInt(car.dailyRentPrice || car.price),
            imageUrl: car.imageUrl || car.image,
            pickupLocation: car.pickupLocation || car.location,
            driverNeeded: formData.driverNeeded,
            specialNote: formData.specialNote,
            bookingDate: new Date().toISOString(),
            totalPrice: parseInt(car.dailyRentPrice || car.price),
            userEmail: user?.email,
            userName: user?.name,
            status: 'confirmed'
        };

        try {
            const res = await fetch(`${API_URL}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });
            
            const data = await res.json();
            
            if (data.success) {
                toast.success('Booking confirmed successfully!');
                setIsOpen(false);
                setFormData({ driverNeeded: 'No', specialNote: '' });
            } else {
                toast.error(data.error || 'Failed to book. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Something went wrong! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isAvailable = (car.availabilityStatus || car.availability) === 'Available';

    return (
        <>
            <Toaster position="top-right" />
            
            <button
                onClick={handleOpenModal}
                disabled={!isAvailable}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAvailable
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:shadow-lg hover:scale-105'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Now
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-black rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/30 max-h-[95vh] overflow-y-auto">
                        
                        <div className="sticky top-0 px-6 py-4 rounded-t-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 z-10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-black">Book This Car</h2>
                                    <p className="text-black/80 text-sm mt-0.5">{car.carName || car.name}</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-black/10">
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="rounded-xl p-4 space-y-3 bg-white/5 border border-yellow-500/20">
                                <div className="flex items-center gap-2 pb-2 mb-2 border-b border-yellow-500/20">
                                    <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">Car Details</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Model:</span><span className="text-sm font-medium text-white">{car.carName || car.name}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Daily Rent:</span><span className="text-sm font-bold text-yellow-500">৳{car.dailyRentPrice || car.price}<span className="text-xs font-normal">/day</span></span></div>
                                    <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Pickup Location:</span><span className="text-sm font-medium text-white">{car.pickupLocation || car.location}</span></div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2"><svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg><span className="text-sm font-semibold text-yellow-500">Driver Needed? <span className="text-red-500">*</span></span></div>
                                <div className="flex flex-wrap gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer group"><div className="relative"><input type="radio" name="driverNeeded" value="Yes" checked={formData.driverNeeded === 'Yes'} onChange={handleChange} className="w-4 h-4 appearance-none rounded-full border-2 border-yellow-500 checked:border-yellow-500 checked:bg-yellow-500 transition-all cursor-pointer" />{formData.driverNeeded === 'Yes' && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-1.5 h-1.5 rounded-full bg-black"></div></div>}</div><span className="text-white text-sm group-hover:text-yellow-500 transition-colors cursor-pointer">Yes</span></label>
                                    <label className="flex items-center gap-2 cursor-pointer group"><div className="relative"><input type="radio" name="driverNeeded" value="No" checked={formData.driverNeeded === 'No'} onChange={handleChange} className="w-4 h-4 appearance-none rounded-full border-2 border-yellow-500 checked:border-yellow-500 checked:bg-yellow-500 transition-all cursor-pointer" />{formData.driverNeeded === 'No' && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-1.5 h-1.5 rounded-full bg-black"></div></div>}</div><span className="text-white text-sm group-hover:text-yellow-500 transition-colors cursor-pointer">No</span></label>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2"><svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg><span className="text-sm font-semibold text-yellow-500">Special Note <span className="text-gray-500 text-xs font-normal">(Optional)</span></span></div>
                                <textarea name="specialNote" value={formData.specialNote} onChange={handleChange} rows="3" placeholder="Any special requests or notes..." className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none text-sm bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" />
                            </div>

                            {user && (
                                <div className="rounded-xl p-3 flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-500/20"><svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                                    <div className="flex-1"><p className="text-xs text-gray-400">Booking under</p><p className="text-sm font-medium text-yellow-500 truncate">{user.email}</p></div>
                                </div>
                            )}
                        </div>

                        <div className="sticky bottom-0 p-6 pt-4 border-t border-yellow-500/20 bg-black">
                            <button onClick={handleSubmit} disabled={loading} className="w-full py-3.5 font-bold rounded-xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 text-base bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">
                                {loading ? (<><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</>) : (<><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Confirm Booking</>)}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingModal;