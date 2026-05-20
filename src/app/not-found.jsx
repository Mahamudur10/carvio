// app/not-found.jsx
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Animated Car Icon */}
                <div className="text-8xl mb-6 animate-bounce">
                    🚗💨
                </div>
                
                {/* Error Code */}
                <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-2">
                    404
                </h1>
                
                {/* Friendly Error Message */}
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                    Oops! Car Not Found
                </h2>
                
                <p className="text-gray-500 mb-8">
                    The page you're looking for seems to have driven off somewhere else. 
                    Don't worry, let's get you back on track!
                </p>
                
                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;