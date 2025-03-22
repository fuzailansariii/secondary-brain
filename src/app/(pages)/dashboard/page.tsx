"use client";
import CardData from "@/components/CardData.";
import React from "react";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl my-16">
      <h1 className="text-2xl md:text-3xl font-bold my-10 ml-5">All Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center gap-8">
        <CardData
          type="Youtube"
          title="Youtube Embed"
          link="https://youtu.be/ofHGE-85EIA?si=hUsGrtMPdkl3squD"
        />
        <CardData
          type="Tweet"
          title="Tweet Embed"
          link="https://x.com/fuzail_ansarii/status/1840449980156514633"
        />
      </div>
    </div>
  );
}
