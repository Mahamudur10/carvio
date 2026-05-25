import ExploreCarsClient from './ExploreCarsClient';

export const dynamic = 'force-dynamic';

const ExploreCars = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
    let cars = [];

    try {
        const res = await fetch(`${API_URL}/explore-cars`, { cache: 'no-store' });
        if (res.ok) cars = await res.json();
    } catch (err) {}

    return <ExploreCarsClient initialCars={cars} />;
};

export default ExploreCars;