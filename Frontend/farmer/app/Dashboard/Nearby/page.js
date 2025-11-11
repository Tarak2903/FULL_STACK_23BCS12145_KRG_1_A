"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NearbyFarmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    if (!token) {
      toast.error("You must be logged in to view nearby farmers!");
      setLoading(false);
      return;
    }

    const fetchNearbyFarmers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/location/nearby", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Failed to fetch nearby farmers");
        }

        const data = await response.json();
        setFarmers(data.data || []);
      } catch (error) {
        toast.error(error.message || "Unable to fetch nearby farmers");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyFarmers();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-800 via-green-600 to-green-400">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-300"></div>
          <div className="mt-4 text-white text-lg">Finding nearby farmers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-400 text-white flex flex-col">
      <ToastContainer />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <h1 className="text-2xl font-bold">🚜 Nearby Farmers (Within 5 km)</h1>
      </header>

      {/* Main Section */}
      <main className="px-6 mt-8 flex-1">
        {farmers.length === 0 ? (
          <div className="text-center text-green-100 text-lg">
            No farmers found nearby.
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farmers.map((farmer, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-start">
                  <div className="text-4xl mb-3">👨‍🌾</div>
                  <h3 className="text-lg font-semibold text-white">
                    Farmer ID: {farmer.user_id}
                  </h3>
                  <p className="text-green-50/90 mt-2">
                    📍 Latitude: {farmer.latitude.toFixed(4)}
                  </p>
                  <p className="text-green-50/90">
                    📍 Longitude: {farmer.longitude.toFixed(4)}
                  </p>
                  <p className="text-green-50/90 mt-2">
                    🌾 Within 5 km range
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-green-100/90 text-sm border-t border-white/10">
        © {new Date().getFullYear()} KisaanConnect | Empowering Farmers Together 🌾
      </footer>
    </div>
  );
}
