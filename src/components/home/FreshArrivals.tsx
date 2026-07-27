"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Leaf } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { ProductCard } from "../ui/ProductCard";

export const FreshArrivals: React.FC = () => {
  const products: Product[] = productsData as Product[];
  
  // Filter for Fresh arrivals
  const freshItems = products
    .filter((p) => p.badge === "Fresh Today" || p.category === "Fruits" || p.category === "Vegetables")
    .slice(0, 4);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#f4fdf8] border-b border-emerald-100/40 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-brand-success">
              <Leaf className="w-4 h-4 fill-brand-success/15" />
              <span className="text-[10px] font-black uppercase tracking-widest font-display">
                Organic & Sourced Daily
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight">
              Fresh Today
            </h2>
          </div>
          <Link
            href="/products?category=Fruits"
            className="flex items-center gap-1 text-xs font-black text-brand-success hover:underline hover:gap-1.5 transition-all uppercase tracking-wider"
          >
            <span>See Fresh Produce</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {freshItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FreshArrivals;
