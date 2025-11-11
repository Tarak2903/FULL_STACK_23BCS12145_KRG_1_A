"use client";
import { useEffect, useState } from "react";

export default function MarketPriceDashboard() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const API_KEY = "579b464db66ec23bdd000001776565b830754ff860687f137d685bf7";
  const BASE_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}?api-key=${API_KEY}&format=json&limit=12`;
      if (commodity) url += `&filters[commodity]=${commodity}`;
      if (state) url += `&filters[state]=${state}`;
      if (district) url += `&filters[district]=${district}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");

      const json = await res.json();
      setPrices(json.records || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load market prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-400 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-3">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Market Price Dashboard</h1>
            <p className="text-sm text-green-100/80">
              Live commodity rates from Indian government data
            </p>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="px-6 mt-6 flex justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-wrap gap-4 justify-center">
          <input
            className="px-3 py-2 rounded-md bg-white/20 text-white placeholder-green-200 text-sm focus:outline-none"
            placeholder="Commodity (e.g., Wheat)"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-md bg-white/20 text-white placeholder-green-200 text-sm focus:outline-none"
            placeholder="State (e.g., Punjab)"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-md bg-white/20 text-white placeholder-green-200 text-sm focus:outline-none"
            placeholder="District (e.g., Ludhiana)"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <button
            onClick={fetchPrices}
            disabled={loading}
            className={`px-4 py-2 rounded-md font-semibold text-gray-900 ${
              loading ? "bg-gray-400" : "bg-lime-400 hover:bg-lime-500"
            }`}
          >
            {loading ? "Loading..." : "Fetch Prices"}
          </button>
        </div>
      </section>

      {/* Main Section */}
      <main className="flex-1 px-6 py-10">
        {error ? (
          <div className="text-center text-red-200">{error}</div>
        ) : loading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-lime-300"></div>
          </div>
        ) : prices.length === 0 ? (
          <div className="text-center text-green-100 mt-6">
            No data found. Try adjusting filters.
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{item.commodity}</h3>
                  <span className="text-xs text-green-200">
                    {item.arrival_date}
                  </span>
                </div>
                <p className="text-green-100/80 text-sm">
                  Variety: {item.variety || "N/A"}
                </p>
                <p className="text-lg mt-2 font-semibold">
                  ₹ {item.modal_price} / Quintal
                </p>
                <p className="text-green-200/70 text-sm mt-2">
                  🏠 {item.market}, {item.district}, {item.state}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-green-100/90 text-sm border-t border-white/10">
        © {new Date().getFullYear()} KisaanConnect | Data from data.gov.in 🌱
      </footer>
    </div>
  );
}
