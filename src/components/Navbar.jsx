"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    const isLoggedIn = !!user;
    const isActive = (path) => pathname === path;

    const handleNavigation = (path) => router.push(path);
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };

    if (loading) {
        return (
            <nav className="sticky top-0 z-50 bg-black">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl">🚗</div>
                            <div>
                                <div className="text-xl font-bold text-yellow-500">Carvio</div>
                                <div className="text-xs text-gray-400">Rental Club</div>
                            </div>
                        </div>
                        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 md:py-4">
                    
                    {/* Logo */}
                    <div onClick={() => handleNavigation("/")} className="flex items-center space-x-3 group cursor-pointer">
                        <div className="text-3xl md:text-4xl transition-transform group-hover:scale-110">🚗</div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-yellow-500">Carvio</div>
                            <div className="text-[10px] md:text-xs text-gray-500 -mt-1">Rental Club</div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => handleNavigation("/")} className={`font-medium transition-all duration-200 ${isActive("/") ? "text-yellow-500 border-b-2 border-yellow-500 pb-1" : "text-gray-300 hover:text-yellow-500"}`}>Home</button>
                        <button onClick={() => handleNavigation("/explore-cars")} className={`font-medium transition-all duration-200 ${isActive("/explore-cars") ? "text-yellow-500 border-b-2 border-yellow-500 pb-1" : "text-gray-300 hover:text-yellow-500"}`}>Explore Cars</button>
                        
                        {isLoggedIn && (
                            <>
                                <button onClick={() => handleNavigation("/add-car")} className={`font-medium transition-all duration-200 ${isActive("/add-car") ? "text-yellow-500 border-b-2 border-yellow-500 pb-1" : "text-gray-300 hover:text-yellow-500"}`}>Add Car</button>
                                <button onClick={() => handleNavigation("/my-bookings")} className={`font-medium transition-all duration-200 ${isActive("/my-bookings") ? "text-yellow-500 border-b-2 border-yellow-500 pb-1" : "text-gray-300 hover:text-yellow-500"}`}>My Bookings</button>
                                <button onClick={() => handleNavigation("/my-added-cars")} className={`font-medium transition-all duration-200 ${isActive("/my-added-cars") ? "text-yellow-500 border-b-2 border-yellow-500 pb-1" : "text-gray-300 hover:text-yellow-500"}`}>My Added Cars</button>
                            </>
                        )}
                        
                        {isLoggedIn ? (
                            <div className="relative">
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none group">
                                    {user?.image || user?.photoURL ? (
                                        <img src={user.image || user.photoURL} alt={user.name} className="w-10 h-10 rounded-full border-2 border-yellow-500 object-cover" referrerPolicy="no-referrer" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-semibold">
                                            {user?.name?.charAt(0) || "U"}
                                        </div>
                                    )}
                                    <span className="text-gray-300 font-medium hidden lg:block group-hover:text-yellow-500 transition">{user?.name?.split(" ")[0]}</span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} style={{ color: '#gray' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 rounded-xl shadow-xl py-2 border z-50 bg-black border-yellow-500/20">
                                        <div className="px-4 py-3 border-b border-yellow-500/10">
                                            <div className="flex items-center gap-3">
                                                {user?.image || user?.photoURL ? (
                                                    <img src={user.image || user.photoURL} alt={user.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-semibold">
                                                        {user?.name?.charAt(0) || "U"}
                                                    </div>
                                                )}
                                                <div><p className="text-sm font-semibold text-white">{user?.name}</p><p className="text-xs text-gray-400 truncate">{user?.email}</p></div>
                                            </div>
                                        </div>
                                        <button onClick={() => { handleNavigation("/add-car"); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-yellow-500 hover:bg-white/5 transition-colors">Add Car</button>
                                        <button onClick={() => { handleNavigation("/my-bookings"); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-yellow-500 hover:bg-white/5 transition-colors">My Bookings</button>
                                        <button onClick={() => { handleNavigation("/my-added-cars"); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-yellow-500 hover:bg-white/5 transition-colors">My Added Cars</button>
                                        <hr className="my-1 border-yellow-500/10" />
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button onClick={() => handleNavigation("/login")} className="text-gray-300 hover:text-yellow-500 transition-colors">Login</button>
                                <button onClick={() => handleNavigation("/register")} className="px-5 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg bg-yellow-500 text-black">Register</button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/10">
                        {isMenuOpen ? (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t border-yellow-500/10">
                        <button onClick={() => { handleNavigation("/"); setIsMenuOpen(false); }} className="block py-2.5 px-2 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-white/5 w-full text-left">Home</button>
                        <button onClick={() => { handleNavigation("/explore-cars"); setIsMenuOpen(false); }} className="block py-2.5 px-2 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-white/5 w-full text-left">Explore Cars</button>
                        {isLoggedIn && (
                            <>
                                <button onClick={() => { handleNavigation("/add-car"); setIsMenuOpen(false); }} className="block py-2.5 px-2 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-white/5 w-full text-left">Add Car</button>
                                <button onClick={() => { handleNavigation("/my-bookings"); setIsMenuOpen(false); }} className="block py-2.5 px-2 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-white/5 w-full text-left">My Bookings</button>
                                <button onClick={() => { handleNavigation("/my-added-cars"); setIsMenuOpen(false); }} className="block py-2.5 px-2 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-white/5 w-full text-left">My Added Cars</button>
                            </>
                        )}
                        <div className="border-t pt-3 border-yellow-500/10">
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="block w-full text-left py-2.5 px-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors w-full text-left">Logout</button>
                            ) : (
                                <div className="space-y-2">
                                    <button onClick={() => { handleNavigation("/login"); setIsMenuOpen(false); }} className="block py-2.5 px-2 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-white/5 w-full text-left">Login</button>
                                    <button onClick={() => { handleNavigation("/register"); setIsMenuOpen(false); }} className="block py-2.5 px-2 text-center rounded-lg font-medium w-full bg-yellow-500 text-black">Register</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;