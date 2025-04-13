import React from "react";

interface FeaturesCardProps {
  title: string;
  description: string;
}

export default function FeaturesCard({
  title,
  description,
}: FeaturesCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
