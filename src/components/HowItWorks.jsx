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
        }
    ];

    return (
        <section className="py-20 md:py-28" style={{ background: '#0A0A0F' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header - Dark Theme */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: 'rgba(218,165,32,0.1)', border: '1px solid rgba(218,165,32,0.2)' }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DAA520' }}></div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#DAA520' }}>
                            Simple Process
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-white">How It</span>{' '}
                        <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #F5C842 40%, #DAA520 70%, #C8960C 100%)', WebkitBackgroundClip: 'text' }}>
                            Works
                        </span>
                    </h2>
                    
                    <p className="text-[#888880] text-lg max-w-2xl mx-auto">
                        Rent your dream car in four easy steps. Fast, secure, and hassle-free.
                    </p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }}></div>
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Background connecting line - Desktop */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-px" style={{ background: 'rgba(218,165,32,0.1)' }}></div>
                    <div className="hidden lg:block absolute top-24 left-0 w-0 h-px transition-all duration-1000" style={{ background: 'linear-gradient(90deg, #DAA520, #F5C842)', width: isVisible ? '100%' : '0%' }}></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Step Card - Dark Theme */}
                                <div className="relative rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2" style={{ background: 'rgba(20,20,25,0.6)', border: '1px solid rgba(218,165,32,0.1)', backdropFilter: 'blur(10px)' }}>
                                    
                                    {/* Step Number Circle - Golden */}
                                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', color: '#0A0A0F' }}>
                                        {step.id}
                                    </div>
                                    
                                    {/* Icon Container - Golden Border */}
                                    <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rounded-full" style={{ background: 'rgba(218,165,32,0.1)', border: '1px solid rgba(218,165,32,0.3)', color: '#DAA520' }}>
                                        {step.icon}
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="text-xl font-bold mb-3 transition-colors duration-300 text-white group-hover:text-[#DAA520]">
                                        {step.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-[#666660] text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                    
                                    {/* Hover Arrow - Golden */}
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <svg className="w-5 h-5 mx-auto" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Arrow between cards - Desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <div className="w-8 h-8 rounded-full shadow-md flex items-center justify-center" style={{ background: '#0A0A0F', border: '1px solid rgba(218,165,32,0.3)' }}>
                                            <svg className="w-4 h-4" style={{ color: '#DAA520' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className={`text-center mt-16 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ borderTop: '1px solid rgba(218,165,32,0.1)' }}>
                    <p className="text-[#666660] mb-4">Ready to start your journey?</p>
                    <Link
                        href="/explore-cars"
                        className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl transition-all duration-200 group"
                        style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', color: '#0A0A0F' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(218,165,32,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Browse Available Cars
                        <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;