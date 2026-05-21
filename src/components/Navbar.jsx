// components/Navbar.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        checkUser();
        
        // Listen for storage changes (when login happens)
        window.addEventListener("storage", checkUser);
        return () => window.removeEventListener("storage", checkUser);
    }, []);

    const isLoggedIn = !!user;

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Explore Cars", path: "/explore-cars" },
    ];

    const privateLinks = [
        { name: "Add Car", path: "/add-car" },
        { name: "My Bookings", path: "/my-bookings" },
        { name: "My Added Cars", path: "/my-added-cars" },
    ];

    const isActive = (path) => pathname === path;

    const handleLogout = async () => {
        await authClient.signOut();
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };

    if (loading) {
        return (
            <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl md:text-4xl">🚗</div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                    Carvio
                                </div>
                                <div className="text-[10px] md:text-xs text-gray-500 -mt-1">
                                    Rental Club
                                </div>
                            </div>
                        </div>
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 md:py-4">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="text-3xl md:text-4xl transition-transform group-hover:scale-110">
                            🚗
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                Carvio
                            </div>
                            <div className="text-[10px] md:text-xs text-gray-500 -mt-1">
                                Rental Club
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`font-medium transition-all duration-200 ${
                                    isActive(link.path)
                                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                                        : "text-gray-700 hover:text-blue-600"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Private Links - শুধু লগইন করলে দেখাবে */}
                        {isLoggedIn &&
                            privateLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`font-medium transition-all duration-200 ${
                                        isActive(link.path)
                                            ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                                            : "text-gray-700 hover:text-blue-600"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                        {/* User Section */}
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
                                >
                                    {user?.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                            {user?.name?.charAt(0) || "U"}
                                        </div>
                                    )}
                                    <span className="text-gray-700 font-medium hidden lg:block">
                                        {user?.name?.split(" ")[0]}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {user?.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                        
                                        {privateLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                        
                                        <hr className="my-1 border-gray-100" />
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="px-5 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block py-2.5 px-2 rounded-lg transition-colors ${
                                    isActive(link.path)
                                        ? "text-blue-700 font-semibold bg-blue-50"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        {isLoggedIn &&
                            privateLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2.5 px-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        
                        <div className="border-t border-gray-100 my-2"></div>
                        
                        {isLoggedIn ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left py-2.5 px-2 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="space-y-2 pt-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2.5 px-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2.5 px-2 rounded-lg text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;