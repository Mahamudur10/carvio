// components/WhyChooseUs.jsx
'use client';

import { useState, useEffect } from 'react';

const WhyChooseUs = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: '🚗',
            title: 'Wide Selection',
            description: 'Choose from 500+ premium cars including luxury, economy, and SUVs.',
            gradient: 'linear-gradient(135deg, #DAA520, #F5C842)'
        },
        {
            icon: '💰',
            title: 'Best Price Guarantee',
            description: 'Get the best rates with no hidden charges or surprise fees.',
            gradient: 'linear-gradient(135deg, #DAA520, #F5C842)'
        },
        {
            icon: '🛡️',
            title: 'Fully Insured',
            description: 'All rentals include comprehensive insurance coverage.',
            gradient: 'linear-gradient(135deg, #DAA520, #F5C842)'
        },
        {
            icon: '⏱️',
            title: 'Quick Booking',
            description: 'Complete your booking in under 2 minutes.',
            gradient: 'linear-gradient(135deg, #DAA520, #F5C842)'
        },
        {
            icon: '📍',
            title: 'Multiple Locations',
            description: 'Pick up and drop off at any of our 50+ locations.',
            gradient: 'linear-gradient(135deg, #DAA520, #F5C842)'
        },
        {
            icon: '🎉',
            title: '24/7 Support',
            description: 'Round-the-clock customer assistance for peace of mind.',
            gradient: 'linear-gradient(135deg, #DAA520, #F5C842)'
        }
    ];

    return (
        <section className="py-20 md:py-28" style={{ background: '#0A0A0F' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header - Dark Theme */}
                <div className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(218,165,32,0.1)', border: '1px solid rgba(218,165,32,0.2)' }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DAA520' }}></div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#DAA520' }}>
                            Why Choose Us
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-white">Why Choose</span>{' '}
                        <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #F5C842 40%, #DAA520 70%, #C8960C 100%)', WebkitBackgroundClip: 'text' }}>
                            Carvio
                        </span>
                    </h2>
                    
                    <p className="text-[#888880] text-lg max-w-2xl mx-auto">
                        We provide the best car rental experience with unmatched service and reliability
                    </p>
                    
                    <div className="flex justify-center mt-5">
                        <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }}></div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ 
                                transitionDelay: `${index * 100}ms`,
                                background: 'rgba(20,20,25,0.6)',
                                border: '1px solid rgba(218,165,32,0.1)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {/* Icon Container - Golden */}
                            <div 
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                                style={{ background: 'linear-gradient(135deg, rgba(218,165,32,0.15), rgba(245,200,66,0.08))', border: '1px solid rgba(218,165,32,0.3)' }}
                            >
                                {feature.icon}
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 text-white group-hover:text-[#DAA520]">
                                {feature.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-[#666660] leading-relaxed">
                                {feature.description}
                            </p>
                            
                            {/* Hover Line - Golden */}
                            <div 
                                className="w-12 h-px mt-4 rounded-full transition-all duration-300 group-hover:w-20"
                                style={{ background: 'linear-gradient(90deg, #DAA520, transparent)' }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;