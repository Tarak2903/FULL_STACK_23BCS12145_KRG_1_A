"use client";
import { useEffect, useState } from "react";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "f7007ea9e0534122ba7120342250911"; // ✅ your key from WeatherAPI

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=4&aqi=no&alerts=no`
          );
          const data = await res.json();
          setWeather(data);
        } catch (e) {
          console.error(e);
          setError("Failed to fetch weather data.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please allow access and reload.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-800 via-green-600 to-green-400">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-300"></div>
          <div className="mt-4 text-white text-lg">Fetching weather data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-400 flex items-center justify-center text-white text-center px-6">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 max-w-lg">
          <h1 className="text-2xl font-bold mb-2">⚠️ Weather Info Unavailable</h1>
          <p className="text-green-100">{error}</p>
        </div>
      </div>
    );
  }

  const current = weather?.current;
  const forecastDays = weather?.forecast?.forecastday || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-400 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-3">
            <span className="text-2xl">🌦️</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Weather Forecast</h1>
            <p className="text-sm text-green-100/80">
              Real-time weather updates for your location
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-lg text-center">
          {/* Current Weather */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={`https:${current.condition.icon}`}
              alt="Weather icon"
              className="w-24 h-24 drop-shadow-lg"
            />
            <h2 className="text-4xl font-bold mt-2">{Math.round(current.temp_c)}°C</h2>
            <p className="capitalize text-green-100/90 text-lg">
              {current.condition.text}
            </p>
            <p className="text-green-200/80 mt-1 text-sm">
              💧 {current.humidity}% | 🌬️ {current.wind_kph} km/h
            </p>
            <p className="text-sm text-green-200/80 mt-1">
              📍 {weather.location.name}, {weather.location.region}
            </p>
          </div>

          {/* Forecast */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-4">
            {forecastDays.slice(1).map((day, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition text-center"
              >
                <p className="font-semibold text-green-200 mb-1">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt="icon"
                  className="w-12 h-12 mx-auto"
                />
                <p className="font-semibold mt-2">
                  {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                </p>
                <p className="text-green-100/80 text-xs capitalize">
                  {day.day.condition.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-green-100/90 text-sm border-t border-white/10">
        © {new Date().getFullYear()} KisaanConnect | Powered by WeatherAPI.com 🌱
      </footer>
    </div>
  );
}
