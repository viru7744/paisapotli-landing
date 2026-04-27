import React from "react";
import { motion } from "framer-motion";
import logo from "./assets/pic.jpg";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  PiggyBank,
  Lightbulb,
  Play,
} from "lucide-react";

function App() {

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Features", id: "features" },
    { name: "Why", id: "why" },
  ];

  return (
    <div className="font-sans text-slate-900">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <span className="text-xl font-bold text-green-800">PaisaPotli</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                className="hover:text-green-600"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Start Learning
          </button>

        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-4">
              अपना पैसा <br />
              <span className="text-green-600">समझदारी से</span> बढ़ाओ
            </h1>

            <p className="text-gray-500 mb-6">
              Savings • Investment • Online Earning • Financial Freedom
            </p>

            <div className="flex gap-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                Start Learning <ArrowRight size={18} />
              </button>

              <button className="border px-6 py-3 rounded-lg flex items-center gap-2">
                <Play size={18} /> Watch Intro
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
              className="rounded-xl shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 text-center py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">
          PaisaPotli.com एक प्लेटफॉर्म है जहाँ आपको सरल हिंदी में वित्तीय ज्ञान मिलता है।
        </h2>
        <p className="text-gray-500">
          Learn finance in simple Hindi and grow your money smartly.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">

          <div className="p-6 bg-white shadow rounded-xl">
            <PiggyBank className="text-green-600 mb-4" />
            <h3 className="font-bold text-lg">Smart Savings</h3>
            <p className="text-gray-500 text-sm">Save money smartly daily</p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <TrendingUp className="text-green-600 mb-4" />
            <h3 className="font-bold text-lg">Investment Guide</h3>
            <p className="text-gray-500 text-sm">Learn stocks & mutual funds</p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <Lightbulb className="text-green-600 mb-4" />
            <h3 className="font-bold text-lg">Online Earning</h3>
            <p className="text-gray-500 text-sm">Earn from home</p>
          </div>

        </div>
      </section>

      {/* Why */}
      <section id="why" className="scroll-mt-24 py-20 px-6 bg-gray-50">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>

          {[
            "100% Hindi Content",
            "Beginner Friendly",
            "Practical Knowledge",
            "No Fake Promises",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="text-green-600" size={18} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
          आज ही अपनी financial journey शुरू करें।
        </h2>

        <button className="bg-white text-green-700 px-6 py-3 rounded-lg mt-4">
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-200">
        © 2025 PaisaPotli
      </footer>

    </div>
  );
}

export default App;