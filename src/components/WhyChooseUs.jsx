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
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: '💰',
            title: 'Best Price Guarantee',
            description: 'Get the best rates with no hidden charges or surprise fees.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: '🛡️',
            title: 'Fully Insured',
            description: 'All rentals include comprehensive insurance coverage.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: '⏱️',
            title: 'Quick Booking',
            description: 'Complete your booking in under 2 minutes.',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: '📍',
            title: 'Multiple Locations',
            description: 'Pick up and drop off at any of our 50+ locations.',
            color: 'from-teal-500 to-green-500'
        },
        {
            icon: '🎉',
            title: '24/7 Support',
            description: 'Round-the-clock customer assistance for peace of mind.',
            color: 'from-indigo-500 to-purple-500'
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Carvio</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We provide the best car rental experience with unmatched service and reliability
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                {feature.icon}
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                            
                            {/* Hover Line */}
                            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mt-4 rounded-full group-hover:w-20 transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;