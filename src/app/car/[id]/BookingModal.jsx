// app/car/[id]/BookingModal.jsx
"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const BookingModal = ({ car }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        driverNeeded: 'No',
        specialNote: ''
    });

    // Get user from localStorage
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to book a car');
            setIsOpen(false);
            return;
        }
        
        setLoading(true);

        const bookingData = {
            carId: car._id,
            carName: car.carName || car.name,
            carPrice: car.dailyRentPrice || car.price,
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

        console.log('Booking Data:', bookingData);

        try {
            const res = await fetch('http://localhost:5000/api/bookings', {
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
                toast.error(data.message || 'Failed to book. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    // Check if car is available
    const isAvailable = (car.availabilityStatus || car.availability) === 'Available';

    return (
        <>
            <Toaster position="top-right" />
            
            {/* Book Now Button */}
            <button
                onClick={() => setIsOpen(true)}
                disabled={!isAvailable}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAvailable
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105 cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Now
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                        
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-white">Book This Car</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-blue-100 text-sm mt-1">{car.carName || car.name}</p>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            
                            {/* Car Details Summary */}
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-100">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Car Model:</span>
                                    <span className="font-semibold text-gray-800">{car.carName || car.name}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Daily Rent:</span>
                                    <span className="font-semibold text-blue-600">৳{car.dailyRentPrice || car.price}/day</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pickup Location:</span>
                                    <span className="font-semibold text-gray-800">{car.pickupLocation || car.location}</span>
                                </div>
                            </div>

                            {/* Driver Needed - Required Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Driver Needed? <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="driverNeeded"
                                            value="Yes"
                                            checked={formData.driverNeeded === 'Yes'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="driverNeeded"
                                            value="No"
                                            checked={formData.driverNeeded === 'No'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Special Note - Optional */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Special Note (Optional)
                                </label>
                                <textarea
                                    name="specialNote"
                                    value={formData.specialNote}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Any special requests or notes..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* User Info Note */}
                            {user && (
                                <div className="bg-blue-50 rounded-xl p-3">
                                    <p className="text-xs text-blue-600 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Booking will be confirmed under: {user.email}
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Confirm Booking
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingModal;