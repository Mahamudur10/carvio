// app/login/page.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        
        setLoading(true);
        
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            
            if (data.success) {
                // Save user to localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                toast.success('Login successful!');
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        toast.info('Google login coming soon!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-12 sm:py-16 flex items-center">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
                
                {/* Page Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 py-1.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Welcome Back
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        <span className="text-gray-900">Login to</span>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
                            Carvio
                        </span>
                    </h1>
                    
                    <p className="text-gray-500 text-sm">
                        Access your account to rent cars
                    </p>
                    
                    <div className="flex justify-center mt-3">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Login Card */}
                <Card className="rounded-2xl shadow-xl border-0">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Logging in...
                                    </div>
                                ) : (
                                    'Login'
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Login Button */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-gray-700 font-medium">Continue with Google</span>
                            </button>

                            {/* Register Link */}
                            <p className="text-center text-sm text-gray-600 mt-4">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;