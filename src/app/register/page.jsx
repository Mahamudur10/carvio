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
    const [formData, setFormData] = useState({ name: '', email: '', photoURL: '', password: '' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) router.push('/');
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Registration successful! Please login.');
                setTimeout(() => router.push('/login'), 1500);
            } else {
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = "http://localhost:3000/api/auth/google/callback";
        const scope = "email profile";
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12" style={{ background: '#0A0A0F' }}>
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-gray-400 mt-2">Join Carvio today</p>
                </div>

                <Card className="rounded-2xl shadow-xl border-0" style={{ background: 'rgba(20,20,25,0.8)' }}>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#DAA520]">Full Name *</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#DAA520]/20 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#DAA520]">Email Address *</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#DAA520]/20 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#DAA520]">Photo URL *</label>
                                <input type="url" value={formData.photoURL} onChange={(e) => setFormData({...formData, photoURL: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#DAA520]/20 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#DAA520]">Password *</label>
                                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#DAA520]/20 text-white" />
                                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#DAA520] to-[#F5C842] text-black font-semibold py-3 rounded-xl">
                                {loading ? "Creating..." : "Register"}
                            </Button>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
                                <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#0A0A0F] text-gray-400">Or continue with</span></div>
                            </div>
                            <button type="button" onClick={handleGoogleRegister} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-700 text-white hover:bg-white/5">
                                <FcGoogle className="text-xl" /> Continue with Google
                            </button>
                            <p className="text-center text-sm mt-6 text-gray-400">Already have an account? <Link href="/login" className="text-[#DAA520] font-semibold">Login</Link></p>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;