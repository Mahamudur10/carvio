// app/car/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";


const BookingModal = ({ car, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    driverNeeded: "No",
    specialNote: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book a car");
      return onClose();
    }
    setLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
    const bookingData = {
      carId: car._id,
      carName: car.carName || car.name,
      carPrice: parseInt(car.dailyRentPrice || car.price),
      imageUrl: car.imageUrl || car.image,
      pickupLocation: car.pickupLocation || car.location,
      driverNeeded: formData.driverNeeded,
      specialNote: formData.specialNote,
      bookingDate: new Date().toISOString(),
      totalPrice: parseInt(car.dailyRentPrice || car.price),
      userEmail: user.email,
      userName: user.name,
      status: "confirmed",
    };
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booking confirmed!");
        onClose();
      } else {
        toast.error("Booking failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black rounded-2xl w-full max-w-md p-6 border border-yellow-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-500">Book This Car</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="bg-white/5 rounded-xl p-4 mb-4 text-sm">
          <p><span className="text-gray-400">Model:</span> {car.carName || car.name}</p>
          <p><span className="text-gray-400">Daily Rent:</span> <span className="text-yellow-500 font-bold">৳{car.dailyRentPrice || car.price}/day</span></p>
          <p><span className="text-gray-400">Pickup:</span> {car.pickupLocation || car.location}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-yellow-500 mb-1">Driver Needed?</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2"><input type="radio" name="driverNeeded" value="Yes" onChange={handleChange} checked={formData.driverNeeded === "Yes"} className="accent-yellow-500" /> Yes</label>
              <label className="flex items-center gap-2"><input type="radio" name="driverNeeded" value="No" onChange={handleChange} checked={formData.driverNeeded === "No"} className="accent-yellow-500" /> No</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-yellow-500 mb-1">Special Note (Optional)</label>
            <textarea name="specialNote" value={formData.specialNote} onChange={handleChange} rows="3" className="w-full px-3 py-2 bg-white/5 border border-yellow-500/20 rounded-lg text-white" placeholder="Any special requests?" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

// -----------------------------------------------
// Main Car Details Page
// -----------------------------------------------
export default function CarDetailsPage({ params }) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCar = async () => {
      const { id } = await params;
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://carvio-server.vercel.app";
      try {
        const res = await fetch(`${API_URL}/cars/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [params]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  if (!car) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Car not found</div>;

  const isAvailable = car.availabilityStatus === "Available";

  return (
    <div className="min-h-screen bg-black py-10">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/explore-cars" className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-500 mb-6 transition">
          ← Back to Explore Cars
        </Link>

        <div className="bg-black/50 border border-yellow-500/20 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image */}
            <div className="relative h-80 md:h-full bg-black">
              <img src={car.imageUrl || car.image} alt={car.carName || car.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">{car.availabilityStatus}</div>
            </div>

            {/* Right: Details & Booking Button */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-white">{car.carName || car.name}</h1>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/10 text-yellow-500 border border-yellow-500/30">{car.carType}</span>
              </div>
              <p className="text-yellow-500 text-2xl font-bold mt-2">৳{car.dailyRentPrice || car.price}<span className="text-sm text-gray-400"> /day</span></p>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div><p className="text-gray-500 text-sm">Seat Capacity</p><p className="text-white">{car.seatCapacity} seats</p></div>
                <div><p className="text-gray-500 text-sm">Pickup Location</p><p className="text-white">{car.pickupLocation || car.location}</p></div>
              </div>
              <p className="text-gray-400 mt-2">{car.description}</p>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!isAvailable}
                className={`w-full mt-8 py-3 rounded-xl font-bold transition ${isAvailable ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-gray-600 text-gray-300 cursor-not-allowed"}`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <BookingModal car={car} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}