// app/explore-cars/page.jsx
import React from 'react';
import ExploreCarsClient from './ExploreCarsClient';

const ExploreCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/explore-cars`, {
        cache: 'no-store'
    });
    const cars = await res.json();

    return <ExploreCarsClient initialCars={cars} />;
};

export default ExploreCars;