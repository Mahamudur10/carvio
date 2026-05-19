// components/Footer.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
import { TbBrandReact } from 'react-icons/tb';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand Section - Company Info */}
                    <div className="space-y-4">
                        {/* Logo with Car Icon */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 text-2xl group-hover:scale-110 transition-transform">
                                🚗
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                    Carvio
                                </div>
                                <div className="text-xs text-gray-500 -mt-0.5">
                                    Rental Club
                                </div>
                            </div>
                        </Link>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            Your trusted car rental platform. Drive with freedom,
                            choose from our wide range of premium cars.
                        </p>

                        {/* Trust Badge */}
                        <div className="flex items-center space-x-2">
                            <span className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20">
                                ✓ 500+ Happy Customers
                            </span>
                        </div>
                    </div>

                    {/* Useful Links Section */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 relative inline-block">
                            Useful Links
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-500 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                >
                                    <span className="text-blue-500 text-xs">▹</span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/explore-cars"
                                    className="text-gray-500 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                >
                                    <span className="text-blue-500 text-xs">▹</span>
                                    Explore Cars
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-500 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                >
                                    <span className="text-blue-500 text-xs">▹</span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-500 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                >
                                    <span className="text-blue-500 text-xs">▹</span>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-gray-500 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                >
                                    <span className="text-blue-500 text-xs">▹</span>
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information Section - Sample Numbers */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 relative inline-block">
                            Contact Info
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-500 hover:text-white transition-colors group">
                                <HiLocationMarker className="text-blue-500 text-lg mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="text-sm">123 Sample Street, Demo City, DC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors group">
                                <HiPhone className="text-blue-500 text-lg group-hover:scale-110 transition-transform" />
                                <span className="text-sm">+999 999 999 999</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors group">
                                <HiMail className="text-blue-500 text-lg group-hover:scale-110 transition-transform" />
                                <span className="text-sm">demo@carvio.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors group">
                                <HiClock className="text-blue-500 text-lg group-hover:scale-110 transition-transform" />
                                <span className="text-sm">24/7 Customer Support</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Icons Section - React Icons */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 relative inline-block">
                            Follow Us
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {/* Facebook */}
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                <FaFacebookF size={18} />
                            </div>

                            {/* X (Twitter) - New Logo */}
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                <FaXTwitter size={18} />
                            </div>

                            {/* Instagram */}
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:text-white hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                <FaInstagram size={18} />
                            </div>

                            {/* LinkedIn */}
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                <FaLinkedinIn size={18} />
                            </div>

                            {/* YouTube */}
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                <FaYoutube size={18} />
                            </div>
                        </div>

                        {/* Demo Note */}
                        <p className="text-xs text-gray-600 mt-4">
                            Social media icons for demonstration only
                        </p>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-800 mt-10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright Text */}
                        <p className="text-sm text-gray-500 text-center md:text-left">
                            © {currentYear} Carvio Rental Club. All rights reserved.
                        </p>

                        {/* Bottom Links */}
                        <div className="flex flex-wrap justify-center gap-3 text-xs">
                            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <span className="text-gray-700">•</span>
                            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <span className="text-gray-700">•</span>
                            <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">
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