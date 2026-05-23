"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            router.push('/');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                const userToStore = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    image: data.user.photoURL,
                    photoURL: data.user.photoURL
                };
                localStorage.setItem('user', JSON.stringify(userToStore));
                toast.success('Login successful!');
                router.push('/');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = "http://localhost:3000/api/auth/google/callback";
        const scope = "email profile";
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        window.location.href = googleAuthUrl;
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12" style={{ background: '#0A0A0F' }}>
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white">Login to Carvio</h1>
                    <p className="text-gray-400 mt-2">Access your account</p>
                </div>

                <Card className="rounded-2xl shadow-xl border-0" style={{ background: 'rgba(20,20,25,0.8)' }}>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#DAA520]">Email Address *</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#DAA520]/20 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#DAA520]">Password *</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#DAA520]/20 text-white" />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#DAA520] to-[#F5C842] text-black font-semibold py-3 rounded-xl">
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
                                <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#0A0A0F] text-gray-400">Or continue with</span></div>
                            </div>
                            <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-700 text-white hover:bg-white/5">
                                <FcGoogle className="text-xl" /> Continue with Google
                            </button>
                            <p className="text-center text-sm mt-6 text-gray-400">Don't have an account? <Link href="/register" className="text-[#DAA520] font-semibold">Register</Link></p>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;