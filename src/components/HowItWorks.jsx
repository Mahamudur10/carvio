// components/HowItWorks.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const HowItWorks = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const steps = [
        {
            id: 1,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            title: 'Search & Select',
            description: 'Browse our collection of 500+ premium cars and choose your perfect ride',
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 2,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'Fill Details',
            description: 'Complete booking form with your preferences and requirements',
            color: 'from-indigo-500 to-indigo-600'
        },
        {
            id: 3,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            title: 'Secure Payment',
            description: 'Pay securely with multiple payment options available',
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 4,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Enjoy Drive',
            description: 'Pick up your car and hit the road with confidence',
            color: 'from-cyan-500 to-cyan-600'
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Simple Process</span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Works</span>
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Rent your dream car in four easy steps. Fast, secure, and hassle-free.
                    </p>
                    
                    {/* Underline */}
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    </div>
                </div>

                {/* Steps - Horizontal Timeline Style */}
                <div className="relative">
                    {/* Background connecting line - Desktop */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 rounded-full"></div>
                    <div className="hidden lg:block absolute top-24 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000" style={{ width: isVisible ? '100%' : '0%' }}></div>
                    
                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Step Card */}
                                <div className="relative bg-white rounded-2xl p-6 text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                                    
                                    {/* Step Number Circle */}
                                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                        {step.id}
                                    </div>
                                    
                                    {/* Icon Container */}
                                    <div className={`w-20 h-20 mx-auto mb-5 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rounded-full transition-all duration-300`}>
                                        {step.icon}
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        {step.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                    
                                    {/* Hover Arrow */}
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <svg className="w-5 h-5 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Arrow between cards - Desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={`text-center mt-16 pt-8 border-t border-gray-100 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-gray-600 mb-4">Ready to start your journey?</p>
                    <Link
                        href="/explore-cars"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 group"
                    >
                        Browse Available Cars
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;