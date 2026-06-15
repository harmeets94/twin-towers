"use client";

import { Leaf, Zap, Building2, Shield } from "lucide-react";

const features = [
  { icon: Leaf, text: "Pollution free environment" },
  { icon: Zap, text: "24*7 power backup & water supply" },
  { icon: Building2, text: "Club House (swimming Pool, Gym)" },
  { icon: Shield, text: "Gated and secured society with CCTV" },
];

export default function ServiceTicker() {
  const duplicatedFeatures = [...features, ...features, ...features];

  return (
    <div className="relative overflow-hidden bg-primary-500 py-5">
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary-500 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary-500 to-transparent z-10" />

      {/* Marquee Content */}
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicatedFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="mx-12 flex items-center gap-4 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{feature.text}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
