"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import girl from "../assets/girl.jpg";
import ballon from "../assets/hot-air-ballon.png";
import city from "../assets/rome.jpg";
import paris from "../assets/paris.jpg";
import pisa from "../assets/Leaning-Tower-of-Pisa-Italy.webp";
import Image from "next/image";

const Stat = ({
  number,
  label,
  sub,
}: {
  number: string;
  label: string;
  sub: string;
}) => (
  <div>
    <h3 className="text-orange-500 text-2xl font-bold">{number}</h3>
    <p className="font-semibold text-gray-800">{label}</p>
    <p className="text-sm text-gray-500">{sub}</p>
  </div>
);

const DiamondImage = ({
  src,
  large = false,
}: {
  src: any;
  large?: boolean;
}) => (
  <div
    className={`relative w-60 h-76  ${
      large ? "row-span-2 w-[280px] h-[520px]" : ""
    }`}
    style={{
      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      WebkitClipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      overflow: "hidden",
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
      borderRadius: "24px",
    }}
  >
    <Image
      src={src}
      alt=""
      className="w-full h-full object-cover"
      style={{ borderRadius: "20px" }}
    />
  </div>
);

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
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleFindTrip = (selectedLocation: string) => {
    const encoded = encodeURIComponent(selectedLocation);
    router.push(`/swiss?location=${encoded}`);
  };

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.location);
        if (data.location.length > 0) setSelectedLocation(data.location[0]);
      })
      .catch((err) => console.error("Failed to fetch locations", err));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7f2] to-white  text-gray-800 px-6 py-10">
      {/* Header */}
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold font-mono">👜 Swiss AI</h1>
        <nav className="space-x-6 text-gray-600">
          <Link
            href="#features"
            className="hover:text-orange-400 text-gray-500"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-orange-400 text-gray-500"
          >
            About Us
          </Link>
          <button
            onClick={() => router.push("/swiss")}
            className="bg-orange-400 px-4 py-2 rounded hover:bg-orange-600 transition text-white"
          >
            Get Started
          </button>
        </nav>
      </header>
      {/* Hero */}
      <section className=" relative px-[80px] pt-[120px] pb-[60px] flex flex-col lg:flex-row items-center justify-between overflow-visible">
        <div className="max-w-xl">
          <h2 className="text-[4rem]  font-bold mb-4 font-mono leading-tight">
            We Make Your
            <span className="text-[4rem] font-bold mb-4 text-orange-400">
              {" "}
              Holiday
            </span>
            <span className="text-gray-900"> More</span>
            {""}
            <span className="text-orange-400"> Incredible</span>
          </h2>
          <p className="text-gray-600 mb-6 font-mono">
            Your personal companion for easy and efficient trip planning
          </p>
          <div className="mt-6 bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 items-center w-full max-w-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,115,0,0.6)]">
            <div className="flex-1 w-full">
              <label className="font-semibold block mb-1 text-gray-800">
                Location
              </label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none text-gray-700 w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {/* Custom arrow icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <button
              className="bg-orange-400 hover:bg-orange-500 transition duration-200 text-white px-6 py-3 rounded-2xl font-semibold"
              onClick={() => handleFindTrip(selectedLocation)}
            >
              Find Trip
            </button>
          </div>
        </div>

        <div className="hero-images relative h-[500px] w-full">
          <div className=" image diamond absolute">
            <Image src={girl} alt="Traveler" />
          </div>
          <div className="image small absolute">
            <Image src={city} alt="city" />
          </div>
          <div className="image main absolute">
            <Image src={ballon} alt="ballon" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-16 px-6  transition-transform duration-1000"
      >
        <h3 className="text-3xl font-semibold text-center mb-12 animate-fade-in-down font-mono">
          We Present Best
          <span className="text-3xl text-orange-400 font-mono"> Benefits</span>
        </h3>
        <div className="flex flex-wrap  justify-center gap-8 px-4 sm:px-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] p-6 rounded-lg shadow  transition-transform hover:-translate-y-1 animate-fade-in hover:shadow-[0_0_20px_rgba(255,115,0,0.6)]"
              style={{
                animationDelay: `${idx * 0.2}s`,
                animationFillMode: "both",
              }}
            >
              <h4 className="text-xl font-semibold mb-2 text-gray-800 font-mono">
                {feature.title}
              </h4>
              <p className="text-gray-600 font-mono">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="bg-[#fffaf5] py-20 px-4 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          <div className="relative w-full md:w-1/2 flex justify-center items-center">
            <div className="grid grid-cols-2 gap-6">
              <DiamondImage src={pisa} />
              <DiamondImage src={paris} large />
              <DiamondImage src={city} />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h3 className="text-4xl  font-semibold font-mono text-gray-900">
              Always Provide The{" "}
              <span className="text-orange-500">Best Service</span>
            </h3>
            <p className="text-gray-600">
              We have been established for more than 10 years to provide a best
              trip holiday
            </p>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mt-8">
              <Stat
                number="25K+"
                label="Our Happy Guest"
                sub="Thousands of satisfied guests"
              />
              <Stat
                number="100+"
                label="Company Partnership"
                sub="Company who working with us"
              />
              <Stat
                number="500+"
                label="Tourist Destination"
                sub="The best place you can visit"
              />
              <Stat
                number="30+"
                label="Category Of Trip"
                sub="Various types of trips for you"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" text-gray-800 py-8 px-6 text-center">
        <p className="mb-2">Built with 💖 using Airbyte, Next.js & MindsDB</p>
        <div className="space-x-4">
          <Link href="#" className="hover:text-orange-400">
            About
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Terms
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  );
}
