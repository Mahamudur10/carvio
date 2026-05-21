"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        if (password.length < 6) return 'Password must be at least 6 characters long';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
        return '';
    };

    // Email/Password Register (Redirect to Login)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const image = formData.get('photoURL');
        const password = formData.get('password');
        
        const validationError = validatePassword(password);
        if (validationError) {
            setPasswordError(validationError);
            toast.error(validationError);
            return;
        }
        
        setLoading(true);
        
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image,
        });

        if (data) {
            toast.success('Registration successful! Please login.');
            localStorage.removeItem('user');
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        }

        if (error) {
            toast.error(error.message || 'Registration failed');
        }
        
        setLoading(false);
    };

    // Google Register (Auto Login)
    const handleGoogleLogin = async () => {
        setLoading(true);
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000/",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-12 sm:py-16 flex items-center">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 py-1.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Join Us
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        <span className="text-gray-900">Create an</span>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
                            Account
                        </span>
                    </h1>
                    
                    <p className="text-gray-500 text-sm">Register to start renting cars</p>
                    
                    <div className="flex justify-center mt-3">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                <Card className="rounded-2xl shadow-xl border-0">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

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

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Photo URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    required
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <p className="text-xs text-gray-400 mt-1">Your profile picture URL</p>
                            </div>

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
                                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                                <ul className="text-xs text-gray-400 mt-2 space-y-1">
                                    <li>✓ Minimum 6 characters</li>
                                    <li>✓ At least one uppercase letter</li>
                                    <li>✓ At least one lowercase letter</li>
                                </ul>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                            >
                                {loading ? "Creating Account..." : "Register"}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FcGoogle className="text-xl" />
                                <span className="text-gray-700 font-medium">Continue with Google</span>
                            </button>

                            <p className="text-center text-sm text-gray-600 mt-4">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
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