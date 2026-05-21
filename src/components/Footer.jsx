// components/Footer.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t" style={{ background: '#0A0A0F', borderColor: 'rgba(218,165,32,0.15)' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110" style={{ background: 'rgba(218,165,32,0.1)' }}>
                                🚗
                            </div>
                            <div>
                                <div className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #F5C842 40%, #DAA520 70%, #C8960C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Carvio
                                </div>
                                <div className="text-xs text-[#666660] -mt-0.5">
                                    Rental Club
                                </div>
                            </div>
                        </Link>

                        <p className="text-sm text-[#666660] leading-relaxed">
                            Your trusted car rental platform. Drive with freedom,
                            choose from our wide range of premium cars.
                        </p>

                        <div className="flex items-center space-x-2">
                            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(218,165,32,0.1)', color: '#DAA520', border: '1px solid rgba(218,165,32,0.2)' }}>
                                ✓ 500+ Happy Customers
                            </span>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 relative inline-block">
                            Useful Links
                            <span className="absolute -bottom-2 left-0 w-8 h-px" style={{ background: '#DAA520' }}></span>
                        </h4>
                        <ul className="space-y-2.5">
                            {['Home', 'Explore Cars', 'About Us', 'Contact', 'Terms & Conditions'].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item === 'Home' ? '/' : item === 'Explore Cars' ? '/explore-cars' : `/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                        className="text-[#666660] hover:text-[#DAA520] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                    >
                                        <span className="text-xs" style={{ color: '#DAA520' }}>▹</span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 relative inline-block">
                            Contact Info
                            <span className="absolute -bottom-2 left-0 w-8 h-px" style={{ background: '#DAA520' }}></span>
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-[#666660] hover:text-white transition-colors group">
                                <HiLocationMarker className="text-lg mt-0.5 transition-transform group-hover:scale-110" style={{ color: '#DAA520' }} />
                                <span className="text-sm">123 Sample Street, Demo City, DC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-[#666660] hover:text-white transition-colors group">
                                <HiPhone className="text-lg transition-transform group-hover:scale-110" style={{ color: '#DAA520' }} />
                                <span className="text-sm">+999 999 999 999</span>
                            </li>
                            <li className="flex items-center gap-3 text-[#666660] hover:text-white transition-colors group">
                                <HiMail className="text-lg transition-transform group-hover:scale-110" style={{ color: '#DAA520' }} />
                                <span className="text-sm">demo@carvio.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-[#666660] hover:text-white transition-colors group">
                                <HiClock className="text-lg transition-transform group-hover:scale-110" style={{ color: '#DAA520' }} />
                                <span className="text-sm">24/7 Customer Support</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Icons */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 relative inline-block">
                            Follow Us
                            <span className="absolute -bottom-2 left-0 w-8 h-px" style={{ background: '#DAA520' }}></span>
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', color: '#888880' }} onMouseEnter={e => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#888880'; }}>
                                <FaFacebookF size={18} />
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', color: '#888880' }} onMouseEnter={e => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#888880'; }}>
                                <FaXTwitter size={18} />
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', color: '#888880' }} onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #833AB4, #E4405F, #F77737)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#888880'; }}>
                                <FaInstagram size={18} />
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', color: '#888880' }} onMouseEnter={e => { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#888880'; }}>
                                <FaLinkedinIn size={18} />
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', color: '#888880' }} onMouseEnter={e => { e.currentTarget.style.background = '#FF0000'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#888880'; }}>
                                <FaYoutube size={18} />
                            </div>
                        </div>
                        <p className="text-xs text-[#444440] mt-4">
                            Social media icons for demonstration only
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-10 pt-8" style={{ borderColor: 'rgba(218,165,32,0.1)' }}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-[#666660] text-center md:text-left">
                            © {currentYear} Carvio Rental Club. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 text-xs">
                            <Link href="/privacy" className="text-[#666660] hover:text-[#DAA520] transition-colors">
                                Privacy Policy
                            </Link>
                            <span className="text-[#444440]">•</span>
                            <Link href="/terms" className="text-[#666660] hover:text-[#DAA520] transition-colors">
                                Terms of Service
                            </Link>
                            <span className="text-[#444440]">•</span>
                            <Link href="/cookies" className="text-[#666660] hover:text-[#DAA520] transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;