"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const MyAddedCarsPage = () => {
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isChecking, setIsChecking] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, carId: null, carName: '' });

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
            fetchMyCars();
        }
    }, [user]);

    const fetchMyCars = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
        try {
            const res = await fetch(`${API_URL}/api/my-cars?email=${user.email}`);
            const data = await res.json();
            setCars(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load your cars');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
        try {
            const res = await fetch(`${API_URL}/api/cars/${deleteModal.carId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                toast.success('Car deleted successfully!');
                fetchMyCars();
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
        const colors = { 'Electric': 'bg-emerald-500/20 text-emerald-400', 'SUV': 'bg-blue-500/20 text-blue-400', 'Sedan': 'bg-purple-500/20 text-purple-400', 'Sports': 'bg-red-500/20 text-red-400', 'Luxury': 'bg-amber-500/20 text-amber-400', 'Hatchback': 'bg-cyan-500/20 text-cyan-400', 'Convertible': 'bg-pink-500/20 text-pink-400' };
        return colors[type] || 'bg-gray-500/20 text-gray-400';
    };

    const getAvailabilityColor = (status) => status === 'Available' ? 'bg-green-600' : 'bg-red-600';

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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">My Listings</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">My Added</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Cars</span>
                    </h1>
                    
                    <p className="text-gray-400 text-base">Manage your car listings - update or delete</p>
                    
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
                ) : cars.length === 0 ? (
                    <div className="text-center py-16 bg-white/5 rounded-2xl border border-yellow-500/10">
                        <div className="text-6xl mb-4">🚗</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No cars added yet</h3>
                        <p className="text-gray-400 mb-6">You haven't added any cars to your listing</p>
                        <Link href="/add-car" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">Add Your First Car</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cars.map((car) => (
                            <div key={car._id} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-black/50 border border-yellow-500/20">
                                <div className="relative h-48 overflow-hidden bg-black">
                                    <img src={car.imageUrl || car.image} alt={car.carName} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold bg-yellow-500 text-black">৳{car.dailyRentPrice}/day</div>
                                    <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold ${getAvailabilityColor(car.availabilityStatus)} text-white`}>{car.availabilityStatus}</div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white">{car.carName}</h3>
                                        <span className={`px-2 py-1 rounded-md text-xs ${getTypeColor(car.carType)}`}>{car.carType}</span>
                                    </div>
                                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{car.description}</p>
                                    <div className="flex gap-2">
                                        <Link href={`/update-car/${car._id}`} className="flex-1 text-center py-2 text-sm bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition">Update</Link>
                                        <button onClick={() => setDeleteModal({ isOpen: true, carId: car._id, carName: car.carName })} className="flex-1 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
                        <div className="bg-black rounded-2xl max-w-md w-full p-6 border border-yellow-500/20">
                            <h3 className="text-xl font-semibold text-white mb-2">Delete Car</h3>
                            <p className="text-gray-400 mb-4">Are you sure you want to delete <span className="font-semibold text-white">{deleteModal.carName}</span>?</p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteModal({ isOpen: false, carId: null, carName: '' })} className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAddedCarsPage;