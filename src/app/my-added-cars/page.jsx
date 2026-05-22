
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';

const MyAddedCarsPage = () => {
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, carId: null, carName: '' });

    // Get user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    // Fetch user's cars
    useEffect(() => {
        if (user?.email) {
            fetchMyCars();
        }
    }, [user]);

    const fetchMyCars = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-cars?email=${user.email}`);
            const data = await res.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
            toast.error('Failed to load your cars');
        } finally {
            setLoading(false);
        }
    };

    // Delete car
    const handleDelete = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${deleteModal.carId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            
            if (data.success) {
                toast.success('Car deleted successfully!');
                fetchMyCars(); // Refresh list
            } else {
                toast.error('Failed to delete car');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setDeleteModal({ isOpen: false, carId: null, carName: '' });
        }
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

    const getAvailabilityColor = (status) => {
        return status === 'Available' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gradient-to-r from-red-500 to-rose-500';
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Page Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 py-1.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            My Listings
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-gray-900">My Added</span>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
                            Cars
                        </span>
                    </h1>
                    
                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                        Manage your car listings - update or delete
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
                ) : cars.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="text-6xl mb-4">🚗</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No cars added yet</h3>
                        <p className="text-gray-500 mb-6">You haven't added any cars to your listing</p>
                        <Link
                            href="/add-car"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Your First Car
                        </Link>
                    </div>
                ) : (
                    /* Cars Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cars.map((car) => (
                            <div
                                key={car._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Car Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img 
                                        src={car.imageUrl || car.image} 
                                        alt={car.carName || car.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                                        ৳{car.dailyRentPrice || car.price}<span className="text-xs">/day</span>
                                    </div>
                                    <div className={`absolute bottom-3 left-3 ${getAvailabilityColor(car.availabilityStatus || car.availability)} text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md`}>
                                        {car.availabilityStatus || car.availability}
                                    </div>
                                </div>
                                
                                {/* Car Info */}
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {car.carName || car.name}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(car.carType || car.type)}`}>
                                            {car.carType || car.type}
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
                                            <span>{car.pickupLocation || car.location}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                                        {car.description}
                                    </p>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/update-car/${car._id}`}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-amber-500 text-white font-semibold text-sm rounded-xl hover:bg-amber-600 transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => setDeleteModal({ isOpen: true, carId: car._id, carName: car.carName || car.name })}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white font-semibold text-sm rounded-xl hover:bg-red-600 transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Delete Car</h3>
                                <p className="text-gray-600 mb-4">
                                    Are you sure you want to delete <span className="font-semibold">{deleteModal.carName}</span>? This action cannot be undone.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setDeleteModal({ isOpen: false, carId: null, carName: '' })}
                                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAddedCarsPage;