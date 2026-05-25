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
        if (localStorage.getItem('user')) {
            router.push('/');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('https://carvio-server.vercel.app/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
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
        const clientId = "213640041962-hmhapk77hm3cpoa43uas51je3eqpnt61.apps.googleusercontent.com";
        const redirectUri = "https://carvio.vercel.app/api/auth/google/callback";
        const scope = "email profile";
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        window.location.href = googleAuthUrl;
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 max-w-md">
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">Welcome Back</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold mb-2">
                        <span className="text-white">Login to</span>{' '}
                        <span className="text-yellow-500">Carvio</span>
                    </h1>
                    <p className="text-gray-400">Access your account to rent cars</p>
                </div>

                <Card className="rounded-2xl bg-black/50 backdrop-blur-sm border border-yellow-500/20">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full px-4 py-2 rounded-xl bg-white/5 border border-yellow-500/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-2 rounded-xl bg-white/5 border border-yellow-500/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                            <Button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-xl hover:bg-yellow-400 transition">{loading ? "Logging in..." : "Login"}</Button>
                            <div className="flex items-center gap-3 my-4"><div className="flex-1 h-px bg-gray-700"></div><span className="text-gray-500 text-sm">OR</span><div className="flex-1 h-px bg-gray-700"></div></div>
                            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-700 text-white hover:bg-white/5 transition"><FcGoogle className="text-xl" /> Continue with Google</button>
                            <p className="text-center text-sm text-gray-500 mt-4">Don't have an account? <Link href="/register" className="text-yellow-500 hover:underline">Register</Link></p>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;