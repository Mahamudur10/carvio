'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

            {/* Main Content */}
            <div className="relative w-full container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-5xl mx-auto">

                    {/* Text Content */}
                    <div className="text-center mb-16">

                        {/* Tagline Badge */}
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-blue-400/20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-blue-300">Ready to Drive?</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                            <span className="text-white">Find Your Perfect</span>
                            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                                Rental Car
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Choose from 500+ premium cars. Best prices guaranteed.
                            Free cancellation and 24/7 customer support.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                            <Link
                                href="/explore-cars"
                                className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Explore Cars
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-200 flex items-center justify-center"
                            >
                                How It Works
                            </Link>
                        </div>
                    </div>

                    {/* Stats Section - Fixed Layout */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">

                            {/* Stat 1 - Premium Cars */}
                            <div className="text-center md:border-r md:border-white/20 md:px-8">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                                <div className="text-sm text-blue-300 font-medium">Premium Cars</div>
                            </div>

                            {/* Stat 2 - Support */}
                            <div className="text-center md:border-r md:border-white/20 md:px-8">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
                                <div className="text-sm text-blue-300 font-medium">Support</div>
                            </div>

                            {/* Stat 3 - Secure Booking */}
                            <div className="text-center md:border-r md:border-white/20 md:px-8">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
                                <div className="text-sm text-blue-300 font-medium">Secure Booking</div>
                            </div>

                            {/* Stat 4 - Rating */}
                            <div className="text-center md:px-8">
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    <span className="text-4xl md:text-5xl font-bold text-white">4.9</span>
                                    <span className="text-3xl md:text-4xl text-yellow-400">★</span>
                                </div>
                                <div className="text-sm text-blue-300 font-medium">Customer Rating</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
                    <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

        </section>
    );
};

export default Banner;
