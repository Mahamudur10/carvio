"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            router.push('/');
        }
    }, [router]);

    const validatePassword = (password) => {
        if (password.length < 6) return 'Password must be at least 6 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validatePassword(formData.password);
        if (validationError) {
            setPasswordError(validationError);
            toast.error(validationError);
            return;
        }
        
        setLoading(true);
        
        try {
            const res = await fetch('https://carvio-server.vercel.app/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    photoURL: formData.photoURL,
                    password: formData.password
                })
            });
            
            const data = await res.json();
            
            if (data.success) {
                toast.success('Registration successful! Please login.');
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
            } else {
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Cannot connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        const clientId = "213640041962-hmhapk77hm3cpoa43uas51je3eqpnt61.apps.googleusercontent.com";
        const redirectUri = "https://carvio.vercel.app/api/auth/google/callback";
        const scope = "email profile";
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        window.location.href = googleAuthUrl;
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 sm:py-16 md:py-20">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">Join Us</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">Create an</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Account</span>
                    </h1>
                    
                    <p className="text-gray-400 text-base">Register to start renting cars</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                </div>

                {/* Register Card */}
                <Card className="rounded-2xl shadow-xl border-0 bg-black/50 backdrop-blur-sm border border-yellow-500/20">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required 
                                    placeholder="Enter your full name" 
                                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required 
                                    placeholder="Enter your email address" 
                                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                />
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                    Photo URL <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="url" 
                                    value={formData.photoURL}
                                    onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                                    required 
                                    placeholder="Enter your profile photo URL" 
                                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                />
                                <p className="text-xs mt-1 text-gray-500">Use a valid image URL for your profile picture</p>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-yellow-500">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="password" 
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required 
                                    placeholder="Create a password" 
                                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500" 
                                />
                                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                                <div className="text-xs mt-2 space-y-1 text-gray-500">
                                    <p className="flex items-center gap-1">✓ Minimum 6 characters</p>
                                    <p className="flex items-center gap-1">✓ At least one uppercase letter</p>
                                    <p className="flex items-center gap-1">✓ At least one lowercase letter</p>
                                </div>
                            </div>

                            {/* Register Button */}
                            <Button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-black text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Register Button */}
                            <button 
                                type="button" 
                                onClick={handleGoogleRegister} 
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-700 text-white hover:bg-white/5 transition-colors duration-200"
                            >
                                <FcGoogle className="text-xl" />
                                <span className="font-medium">Continue with Google</span>
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-sm mt-6 text-gray-500">
                                Already have an account?{' '}
                                <Link href="/login" className="text-yellow-500 font-semibold hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;