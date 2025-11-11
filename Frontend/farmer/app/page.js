"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 flex flex-col justify-center items-center text-white">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          🌾 KisaanConnect
        </h1>
        <p className="text-lg md:text-xl text-green-100 max-w-md mx-auto mb-10">
          Empowering farmers through digital connections
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex gap-6"
      >
        <button
          onClick={() => router.push("/Login")}
          className="px-8 py-3 bg-white text-green-800 font-semibold rounded-full shadow-lg hover:bg-green-100 transition-transform transform hover:scale-105"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/Signup")}
          className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-800 transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>
      </motion.div>

      <footer className="absolute bottom-4 text-green-100 text-sm">
        © {new Date().getFullYear()} KisaanConnect. All rights reserved.
      </footer>
    </div>
  );
}
