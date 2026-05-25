import Link from 'next/link';

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-black py-20">
            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-yellow-500/10 border border-yellow-500/20">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-500"></div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">Simple Process</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    <span className="text-white">How It</span>{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Works</span>
                </h1>
                
                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                    Rent your dream car in four easy steps. Fast, secure, and hassle-free.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-3xl">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Search & Select</h3>
                        <p className="text-gray-400 text-sm">Browse 500+ premium cars</p>
                    </div>
                    <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-3xl">📝</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Fill Details</h3>
                        <p className="text-gray-400 text-sm">Complete booking form</p>
                    </div>
                    <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-3xl">💳</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Secure Payment</h3>
                        <p className="text-gray-400 text-sm">Pay with multiple options</p>
                    </div>
                    <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-3xl">🚗</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Enjoy Drive</h3>
                        <p className="text-gray-400 text-sm">Pick up and hit the road</p>
                    </div>
                </div>

                <Link href="/explore-cars" className="inline-flex items-center gap-2 mt-12 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition">
                    Browse Available Cars
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}