import React from 'react';
import Link from 'next/link';
import ExploreCarsClient from './ExploreCarsClient';

const ExploreCars = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    try {
        const res = await fetch(`${API_URL}/explore-cars`, {
            cache: 'no-store'
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const cars = await res.json();
        return <ExploreCarsClient initialCars={cars} />;
        
    } catch (error) {
        console.error('Error fetching cars:', error);
        return (
            <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-white mb-3">Unable to Load Cars</h1>
                    <p className="text-[#888880] mb-6">Please make sure the backend server is running on port 5000</p>
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', color: '#0A0A0F' }}
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }
};

export default ExploreCars;