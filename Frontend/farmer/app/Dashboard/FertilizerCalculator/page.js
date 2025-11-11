"use client";

import React, { useState } from "react";

const FertilizerCalculator = () => {
  const [area, setArea] = useState("");
  const [fertilizer, setFertilizer] = useState("Urea");
  const [result, setResult] = useState(null);

  const fertilizerRates = {
    Urea: 50, // kg per acre
    NPK: 40,
    DAP: 30,
    Potash: 20,
  };

  const handleCalculate = () => {
    if (!area || area <= 0) {
      alert("Please enter a valid farm area.");
      return;
    }

    const rate = fertilizerRates[fertilizer];
    const total = rate * area;
    setResult({
      fertilizer,
      area,
      total,
      rate,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-400 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-3">
            <span className="text-2xl">🌿</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Fertilizer Calculator</h1>
            <p className="text-sm text-green-100/80">
              Estimate fertilizer requirement based on your farm size
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-6 py-10">
        <div className="w-full max-w-xl bg-white border border-green-100 rounded-3xl shadow-lg p-8 relative overflow-hidden text-green-800">
          {/* Decorative background accent */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-60"></div>

          <h2 className="text-3xl font-extrabold text-center mb-8 drop-shadow-sm">
            🌾 Fertilizer Calculator
          </h2>

          <div className="space-y-6">
            {/* Input - Area */}
            <div>
              <label className="block text-green-800 font-semibold mb-2">
                Farm Area (in acres)
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter your farm size..."
                className="w-full p-3 border border-green-300 rounded-xl text-green-900 placeholder: focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Select - Fertilizer */}
            <div>
              <label className="block text-green-800 font-semibold mb-2">
                Fertilizer Type
              </label>
              <select
                value={fertilizer}
                onChange={(e) => setFertilizer(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-xl bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.keys(fertilizerRates).map((type) => (
                  <option key={type} className="text-green-900">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 active:scale-[0.98] transition-all shadow-md"
            >
              Calculate
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Calculation Result
              </h3>
              <p className="text-green-700">
                For <strong>{result.area}</strong> acres using{" "}
                <strong>{result.fertilizer}</strong>:
              </p>
              <p className="text-3xl font-extrabold text-green-800 mt-3">
                🧮 {result.total} kg
              </p>
              <p className="text-sm text-green-600 mt-1">
                (Rate: {result.rate} kg per acre)
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-green-100/90 text-sm border-t border-white/10">
        © {new Date().getFullYear()} KisaanConnect | Empowering Farmers Together 🌾
      </footer>
    </div>
  );
};

export default FertilizerCalculator;
