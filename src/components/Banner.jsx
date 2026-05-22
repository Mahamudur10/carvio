'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const stats = [
        { value: '500+', label: 'Premium Cars', icon: '🚗' },
        { value: '24/7', label: 'Support', icon: '🛎️' },
        { value: '100%', label: 'Secure Booking', icon: '🔒' },
        { value: '4.9★', label: 'Customer Rating', icon: '⭐' },
    ];

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0F]">

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                }}
            />

            {/*Subtle gradient mesh */}
            <div className="absolute inset-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(218,165,32,0.06) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(180,120,20,0.05) 0%, transparent 70%)' }} />
                <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ background: 'radial-gradient(circle, rgba(255,220,100,0.03) 0%, transparent 70%)' }} />
            </div>

            {/* Fine horizontal line accent */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(218,165,32,0.4), transparent)' }} />

            {/* Main content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pt-24 pb-16">

                {/* Top badge */}
                <div
                    className="flex justify-center mb-10"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <div
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium tracking-widest uppercase"
                        style={{
                            border: '1px solid rgba(218,165,32,0.25)',
                            background: 'rgba(218,165,32,0.06)',
                            color: '#DAA520',
                            letterSpacing: '0.15em',
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] animate-pulse" />
                        Premium Car Rental
                    </div>
                </div>

                {/* Headline */}
                <div
                    className="text-center mb-6"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                    }}
                >
                    <h1
                        className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
                        style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                    >
                        <span
                            className="block"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 30%, #b0b0b0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Find Your
                        </span>
                        <span
                            className="block"
                            style={{
                                background: 'linear-gradient(135deg, #DAA520 0%, #F5C842 40%, #DAA520 70%, #C8960C 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Perfect Car
                        </span>
                    </h1>
                </div>

                {/* Thin divider */}
                <div
                    className="flex justify-center mb-8"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.7s ease 0.2s',
                    }}
                >
                    <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }} />
                </div>

                {/* Subheading */}
                <div
                    className="text-center mb-12"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
                    }}
                >
                    <p className="text-base md:text-lg text-[#888880] max-w-xl mx-auto leading-relaxed tracking-wide font-light">
                        500+ premium vehicles. Best prices guaranteed.
                        Free cancellation & 24/7 support — always.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s',
                    }}
                >
                    <Link
                        href="/explore-cars"
                        className="group relative px-9 py-3.5 font-semibold text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #DAA520, #F5C842)',
                            color: '#0A0A0F',
                            letterSpacing: '0.12em',
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Cars
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: 'linear-gradient(135deg, #F5C842, #FFD700)' }}
                        />
                    </Link>

                    <Link
                        href="/how-it-works"
                        className="group px-9 py-3.5 font-medium text-sm tracking-widest uppercase rounded-sm transition-all duration-300"
                        style={{
                            border: '1px solid rgba(218,165,32,0.3)',
                            color: '#DAA520',
                            letterSpacing: '0.12em',
                            background: 'transparent',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(218,165,32,0.08)';
                            e.currentTarget.style.borderColor = 'rgba(218,165,32,0.6)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'rgba(218,165,32,0.3)';
                        }}
                    >
                        How It Works
                    </Link>
                </div>

                {/* Stats bar */}
                <div
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
                        border: '1px solid rgba(218,165,32,0.12)',
                        borderRadius: '2px',
                        background: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center py-8 px-6 text-center"
                                style={{
                                    borderRight: i < 3 ? '1px solid rgba(218,165,32,0.1)' : 'none',
                                    borderBottom: i < 2 ? '1px solid rgba(218,165,32,0.1)' : 'none',
                                }}
                            >
                                <div
                                    className="text-3xl md:text-4xl font-bold mb-1"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                        background: 'linear-gradient(135deg, #DAA520, #F5C842)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-xs tracking-widest uppercase text-[#666660]" style={{ letterSpacing: '0.12em' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.8), transparent)' }} />

        </section>
    );
};

export default Banner;
