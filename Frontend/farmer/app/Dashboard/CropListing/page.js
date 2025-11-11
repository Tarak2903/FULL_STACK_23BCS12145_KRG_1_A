"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CropListing() {
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState([]);
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // ✅ Fetch all crops
  const fetchCrops = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      const res = await fetch("http://localhost:8080/api/crops/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch crops");
      const result = await res.json();
      setCrops(result.data || []);
    } catch (err) {
      toast.error("Error fetching crops", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add crop
  const handleAddCrop = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("jwt");

    const newCrop = { cropName, quantity, price };

    try {
      const res = await fetch("http://localhost:8080/api/crops/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCrop),
      });

      if (!res.ok) throw new Error("Failed to add crop");

      toast.success("Crop added successfully!", { theme: "dark" });
      setCropName("");
      setQuantity("");
      setPrice("");
      fetchCrops();
    } catch {
      toast.error("Error adding crop", { theme: "dark" });
    }
  };

  // 🗑 Delete crop
 const handleDeleteCrop = async (id) => {
  const token = sessionStorage.getItem("jwt");
  if (!token) {
    alert("No token found! Please login again.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/api/crops/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
    
      throw new Error("Failed to delete crop");
    }
    toast.success("Crop deleted successfully!", { theme: "dark" });
    
    
    fetchCrops();
  } catch (err) {
    alert("Error deleting crop");
  }
};


  useEffect(() => {
    fetchCrops();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-800 via-green-600 to-green-400">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-300"></div>
          <div className="mt-4 text-white text-lg">Loading your crops...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-400 text-white flex flex-col">
      <ToastContainer />

      <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <h1 className="text-2xl font-bold">🌱 My Crop Listings</h1>
      </header>

      <section className="px-6 mt-8">
        <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20">
          <h2 className="text-xl font-semibold mb-4">Add New Crop</h2>
          <form onSubmit={handleAddCrop} className="grid gap-4 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Crop Name"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
              className="p-2 rounded-md text-black"
            />
            <input
              type="number"
              placeholder="Quantity (kg)"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="p-2 rounded-md text-black"
            />
            <input
              type="number"
              placeholder="Price (₹/kg)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="p-2 rounded-md text-black"
            />

            <button
              type="submit"
              className="sm:col-span-3 bg-lime-400 hover:bg-lime-500 text-gray-900 px-4 py-2 rounded-md font-semibold shadow-md transition"
            >
              Add Crop
            </button>
          </form>
        </div>
      </section>

      <main className="px-6 mt-8 flex-1">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crops.length === 0 ? (
            <div className="text-center text-green-100 col-span-full">
              No crops listed yet. Add one above!
            </div>
          ) : (
            crops.map((crop) => (
              <div
                key={crop.id}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-3">🌾</div>
                  <h3 className="text-lg font-semibold">{crop.cropName}</h3>
                  <p className="text-green-50/90 mt-1">
                    Quantity: {crop.quantity} kg
                  </p>
                  <p className="text-green-50/90">Price: ₹{crop.price} / kg</p>
                </div>
                <button
                  onClick={() => handleDeleteCrop(crop.id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-green-100/90 text-sm border-t border-white/10">
        © {new Date().getFullYear()} KisaanConnect | Empowering Farmers Together 🌱
      </footer>
    </div>
  );
}
