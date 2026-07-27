"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface BrandItem {
  name: string;
  logoText: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export const PopularBrands: React.FC = () => {
  const brands: BrandItem[] = [
    { name: "Nestlé", logoText: "Nestlé", bgColor: "bg-blue-50/70", borderColor: "border-blue-100", textColor: "text-blue-700" },
    { name: "Olper's", logoText: "Olper's", bgColor: "bg-red-50/70", borderColor: "border-red-100", textColor: "text-red-750" },
    { name: "Shan", logoText: "Shan", bgColor: "bg-amber-50/70", borderColor: "border-amber-100", textColor: "text-amber-800" },
    { name: "National", logoText: "National", bgColor: "bg-orange-50/70", borderColor: "border-orange-100", textColor: "text-orange-700" },
    { name: "Tapal", logoText: "Tapal", bgColor: "bg-emerald-50/70", borderColor: "border-emerald-100", textColor: "text-emerald-800" },
    { name: "Lipton", logoText: "Lipton", bgColor: "bg-yellow-50/70", borderColor: "border-yellow-100", textColor: "text-yellow-750" },
    { name: "K&N's", logoText: "K&N's", bgColor: "bg-rose-50/50", borderColor: "border-rose-100", textColor: "text-rose-800" },
    { name: "Peek Freans", logoText: "Peek Freans", bgColor: "bg-amber-50/50", borderColor: "border-amber-150/70", textColor: "text-amber-700" },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 select-none bg-[#fffbf5] border-b border-orange-100/25">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-brand-accent">
            <Sparkles className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-display">Household Favorites</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight">Popular Brands</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 15, stiffness: 220, delay: index * 0.02 }}
            >
              <Link
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className={`flex flex-col items-center justify-center p-6 rounded-[20px] border ${brand.bgColor} ${brand.borderColor} hover:border-brand-accent/40 shadow-soft hover:shadow-md transition-all active:scale-95 group`}
              >
                <span className={`font-display text-base sm:text-lg font-black tracking-tight ${brand.textColor} group-hover:scale-105 transition-transform duration-200`}>
                  {brand.logoText}
                </span>
                <span className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-widest group-hover:text-brand-accent transition-colors">
                  Explore
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularBrands;
