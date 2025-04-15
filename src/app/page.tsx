import React from "react";
import Link from "next/link";
import { featuresCardData } from "@/utils/RawData";
import FeaturesCard from "@/components/FeaturesCard";
import CardData from "@/components/CardData.";

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-20 md:gap-10 p-6 md:min-h-screen">
        {/* Left Section */}
        <div className="flex flex-col justify-center md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your <span className="text-blue-600">Secondary Brain</span> for the
            Internet
          </h1>
          <p className="text-lg text-gray-600">
            Save YouTube videos, tweets, and important links to revisit later—
            cleanly, quickly, and all in one place.
          </p>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2">
          <p className="text-sm font-semibold text-gray-500 mb-2">Preview</p>
          <div className="flex items-center justify-center rounded-md">
            {/* <span className="text-gray-400">
                [ Embedded YouTube / Tweet Preview ]
              </span> */}
            <CardData
              id="1911998203538391224"
              link="https://x.com/fuzail_ansarii/status/1911998203538391224"
              title="Portfolio"
              type="Tweet"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12 text-center">
        {featuresCardData.map((item, index) => (
          <FeaturesCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
