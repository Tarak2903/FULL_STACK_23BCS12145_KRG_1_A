"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FarmerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    router.push("/");
  };

  const handleClick1 = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const success = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLong(longitude);

    const token = sessionStorage.getItem("jwt");
    if (!token) {
      toast.error("You are not logged in!");
      router.push("/Login");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("http://localhost:8080/api/location/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update location");
      }

      const data = await response.json();

      toast.success(
        `Location saved successfully! Lat: ${latitude}, Long: ${longitude}`,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        }
      );
    } catch (err) {
      toast.error(err.message || "Something went wrong while saving location.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const error = () => {
    toast.error("Failed to get location. Please allow location access.", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      router.push("/Login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-800 via-green-600 to-green-400">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-300"></div>
          <div className="mt-4 text-white text-lg">Checking authentication...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-400 text-white flex flex-col">
      <ToastContainer />

      <header className="flex items-center justify-between px-6 py-4 bg-white/8 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-3">
            <span className="text-2xl">🌾</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">KisaanConnect</h1>
            <p className="text-sm text-green-100/80">Empowering farmers together</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 px-4 py-2 rounded-md font-semibold shadow-md transition"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="px-6 mt-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white/95">Welcome Back</h2>
          <p className="text-green-100/90 mt-2">Here’s your personalized farmer dashboard overview</p>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleClick1}
              disabled={isSaving}
              className={`${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-lime-400 hover:bg-lime-500"
              } text-gray-900 px-6 py-2 rounded-md font-semibold shadow-md transition`}
            >
              {isSaving ? "Saving..." : "Add / Update Location"}
            </button>
          </div>
        </div>
      </section>

      <main className="px-6 mt-8 flex-1">
        <section className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            onClick={() => router.push("/Dashboard/CropListing")}
            className="cursor-pointer p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🌱</div>
            <h3 className="text-lg font-semibold text-white">My Crop Listings</h3>
            <p className="text-green-50/90 mt-2">View and manage your listed crops.</p>
          </div>

          <div
            onClick={() => router.push("/Dashboard/Nearby")}
            className="cursor-pointer p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">👨‍🌾</div>
            <h3 className="text-lg font-semibold text-white">Nearby Farmers</h3>
            <p className="text-green-50/90 mt-2">Find farmers growing the same crops near you.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-lg font-semibold text-white">My Pools</h3>
            <p className="text-green-50/90 mt-2">Join or create pools to sell crops in bulk.</p>
          </div>

          <div 
           onClick={() => router.push("/Dashboard/Weather")}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="text-4xl mb-3">🌡️</div>
            <h3 className="text-lg font-semibold text-white">Weather</h3>
            <p className="text-green-50/90 mt-2">Stay updated about weather in you region .</p>
          </div>

          <div
           onClick={() => router.push("/Dashboard/Price")}
           className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="text-4xl mb-3">💵</div>
            <h3 className="text-lg font-semibold text-white">Live Mandi Price</h3>
            <p className="text-green-50/90 mt-2">View live market prices of crops.</p>
          </div>

          <div
           onClick={() => router.push("/Dashboard/FertilizerCalculator")}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="text-4xl mb-3">🧪</div>
            <h3 className="text-lg font-semibold text-white">Fertilizer Caculator</h3>
            <p className="text-green-50/90 mt-2">Calculate how much fertilizer is requried for your land.</p>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-green-100/90 text-sm border-t border-white/10">
        © {new Date().getFullYear()} KisaanConnect | Empowering Farmers Together 🌱
      </footer>
    </div>
  );
}
