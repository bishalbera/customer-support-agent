"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import hero from "../assets/lottie/hero.json";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-800 rounded animate-pulse"></div>
  ),
});

const features = [
  {
    title: "Smart Flight Search",
    description:
      "Find the best flights tailored to your preferences, budget, and time.",
  },
  {
    title: "Ticket Management",
    description:
      "Easily book, cancel, or modify your travel tickets from one dashboard.",
  },
  {
    title: "24/7 Assistant",
    description:
      "Get round-the-clock AI support for all your travel-related queries.",
  },
  {
    title: "Hotel Booking",
    description:
      "Browse and book accommodations with real-time availability and pricing.",
  },
  {
    title: "Car Rental",
    description:
      "Compare and reserve rental cars from major providers in seconds.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [lottieLoaded, setLottieLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#3b0764] text-white min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400 font-mono">Swiss AI</h1>
        <nav className="flex space-x-6 items-center">
          <Link href="#features" className="hover:text-blue-400">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-blue-400">
            How It Works
          </Link>
          <button
            onClick={() => router.push("/swiss")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </nav>
      </header>
      {/* Hero */}
      <section
        className={`text-center py-20 px-6 transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Lottie Animation */}
          <div className="w-full md:w-1/2">
            {mounted ? (
              <Lottie animationData={hero} loop className="w-full h-64" />
            ) : (
              <div className="w-full h-64 bg-gray-800 rounded animate-pulse" />
            )}
          </div>

          {/* Hero Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
              Your Personal AI Travel Assistant
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-6 animate-fade-in">
              Search flights, manage tickets, and get instant answers — all in
              one place.
            </p>
            <button
              onClick={() => router.push("/swiss")}
              className="bg-blue-500 px-6 py-3 text-lg rounded hover:bg-blue-600 transition animate-fade-in-up"
            >
              Try It Now
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-16 px-6 bg-gray-900 transition-transform duration-1000"
      >
        <h3 className="text-3xl font-semibold text-center mb-12 animate-fade-in-down">
          Features
        </h3>
        <div className="flex flex-wrap justify-center gap-8 px-4 sm:px-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] p-6 rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1 animate-fade-in"
              style={{
                animationDelay: `${idx * 0.2}s`,
                animationFillMode: "both",
              }}
            >
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section
        id="how-it-works"
        className="py-16 px-6 animate-fade-in-up transition-all duration-1000"
      >
        <h3 className="text-3xl font-semibold text-center mb-12">
          How It Works
        </h3>
        <ol className="space-y-6 max-w-2xl mx-auto text-gray-300">
          <li>
            <strong className="text-blue-400">Step 1:</strong> Ask your question
            in the chat
          </li>
          <li>
            <strong className="text-blue-400">Step 2:</strong> AI fetches live
            travel data
          </li>
          <li>
            <strong className="text-blue-400">Step 3:</strong> Take action —
            book, cancel or explore options
          </li>
        </ol>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center border-t border-gray-800">
        <p className="mb-2">Built with 💖 using Airbyte, Next.js & MindsDB</p>
        <div className="space-x-4">
          <Link href="#" className="hover:text-blue-400">
            About
          </Link>
          <Link href="#" className="hover:text-blue-400">
            Terms
          </Link>
          <Link href="#" className="hover:text-blue-400">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  );
}
