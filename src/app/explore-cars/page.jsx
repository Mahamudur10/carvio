// app/explore-cars/page.jsx
import React from 'react';
import ExploreCarsClient from './ExploreCarsClient';

const ExploreCars = async () => {
    const res = await fetch('http://localhost:5000/explore-cars', {
        cache: 'no-store'
    });
    const cars = await res.json();

    return <ExploreCarsClient initialCars={cars} />;
};

export default ExploreCars;