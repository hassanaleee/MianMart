"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Award } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { ProductCard } from "../ui/ProductCard";

export const PopularProducts: React.FC = () => {
  const products: Product[] = productsData as Product[];
  
  // Filter popular and best seller items
  const popular = products
    .filter((p) => p.badge === "Popular" || p.badge === "Best Seller")
    .slice(0, 4);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#ebf2fa]/35 border-b border-sky-100/30 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-brand-primary/60">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest font-display">
                Handpicked Favorites
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight">
              Top Picks
            </h2>
          </div>
          <Link
            href="/products?filter=popular"
            className="flex items-center gap-1 text-xs font-black text-brand-primary hover:text-brand-accent hover:underline hover:gap-1.5 transition-all uppercase tracking-wider"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularProducts;
