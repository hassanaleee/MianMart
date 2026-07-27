"use client";

import React from "react";
import { MapPin, Clock } from "lucide-react";

export const DeliveryBanner: React.FC = () => {
  return (
    <div className="w-full bg-brand-primary text-white py-2 px-4 text-xs md:text-sm font-medium flex items-center justify-center gap-6 select-none shadow-sm z-50">
      <div className="flex items-center gap-1.5">
        <MapPin className="w-4 h-4 text-brand-accent animate-bounce" />
        <span>Delivering across <span className="font-bold">Mian Channu</span></span>
      </div>
      <div className="w-px h-3 bg-white/30 hidden xs:block" />
      <div className="items-center gap-1.5 hidden xs:flex">
        <Clock className="w-4 h-4 text-brand-accent" />
        <span>Estimated delivery: <span className="font-bold">30–45 mins</span></span>
      </div>
    </div>
  );
};

export default DeliveryBanner;
