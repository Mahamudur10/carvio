// app/not-found.jsx
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Animated Car Icon */}
                <div className="text-8xl mb-6 animate-bounce">
                    🚗💨
                </div>
                
                {/* Error Code */}
                <h1 className="text-6xl md:text-7xl font-bold mb-2" style={{ background: 'linear-gradient(135deg, #DAA520, #F5C842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    404
                </h1>
                
                {/* Friendly Error Message */}
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    Oops! Car Not Found
                </h2>
                
                <p className="text-gray-400 mb-8">
                    The page you're looking for seems to have driven off somewhere else. 
                    Don't worry, let's get you back on track!
                </p>
                
                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black"
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