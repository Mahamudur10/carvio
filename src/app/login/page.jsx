"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Check if already logged in (Better Auth session)
    useEffect(() => {
        const checkSession = async () => {
            const { data: session } = await authClient.getSession();
            if (session?.user) {
                localStorage.setItem('user', JSON.stringify(session.user));
                router.push('/');
            }
        };
        checkSession();
    }, [router]);

    // Email/Password Login (Auto Login)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (data) {
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success('Login successful!');
            router.push('/');
        }

        if (error) {
            toast.error(error.message || 'Login failed');
        }

        setLoading(false);
    };

    // Google Login (Auto Login)
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
                            Welcome Back
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        <span className="text-gray-900">Login to</span>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
                            Carvio
                        </span>
                    </h1>
                    
                    <p className="text-gray-500 text-sm">Access your account to rent cars</p>
                    
                    <div className="flex justify-center mt-3">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                <Card className="rounded-2xl shadow-xl border-0">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
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

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                            >
                                {loading ? "Logging in..." : "Login"}
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