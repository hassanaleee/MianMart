"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { ProductCard } from "../ui/ProductCard";

export const TodaysDeals: React.FC = () => {
  const products: Product[] = productsData as Product[];
  
  // Get products with discount, sorted by discount percentage desc
  const deals = products
    .filter((p) => p.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#fff8f2] border-b border-orange-100/40 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-brand-accent">
              <Sparkles className="w-4 h-4 fill-current animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest font-display">
                Weekend Special Offers
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight">
              Today&apos;s Deals
            </h2>
          </div>
          <Link
            href="/products?filter=deals"
            className="flex items-center gap-1 text-xs font-black text-brand-accent hover:underline hover:gap-1.5 transition-all uppercase tracking-wider"
          >
            <span>See All Deals</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TodaysDeals;
