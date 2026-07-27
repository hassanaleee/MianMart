"use client";

import React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Apple, 
  Leaf, 
  Milk, 
  Croissant, 
  Cookie, 
  CupSoda, 
  Snowflake, 
  Sparkles, 
  Flower2, 
  Baby 
} from "lucide-react";
import { motion } from "framer-motion";

interface CategoryItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  background: string;
  border: string;
  iconBg: string;
  text: string;
  iconColor: string;
  caption: string;
}

export const Categories: React.FC = () => {
  const categories: CategoryItem[] = [
    { name: "Fruits", icon: Apple, background: "from-rose-50/60 to-rose-100/30", border: "border-rose-100/70 hover:border-rose-200", iconBg: "bg-rose-100/80", text: "text-rose-900", iconColor: "text-rose-600", caption: "Fresh orchard picks" },
    { name: "Vegetables", icon: Leaf, background: "from-emerald-50/60 to-emerald-100/30", border: "border-emerald-100/70 hover:border-emerald-200", iconBg: "bg-emerald-100/80", text: "text-emerald-900", iconColor: "text-emerald-600", caption: "Daily fresh harvest" },
    { name: "Dairy", icon: Milk, background: "from-sky-50/60 to-sky-100/30", border: "border-sky-100/70 hover:border-sky-200", iconBg: "bg-sky-100/80", text: "text-sky-900", iconColor: "text-sky-600", caption: "Farm fresh milk & eggs" },
    { name: "Bakery", icon: Croissant, background: "from-amber-50/60 to-amber-100/30", border: "border-amber-100/70 hover:border-amber-200", iconBg: "bg-amber-100/80", text: "text-amber-900", iconColor: "text-amber-600", caption: "Freshly baked items" },
    { name: "Snacks", icon: Cookie, background: "from-orange-50/60 to-orange-100/30", border: "border-orange-100/70 hover:border-orange-200", iconBg: "bg-orange-100/80", text: "text-orange-900", iconColor: "text-orange-600", caption: "Crispy tea-time snacks" },
    { name: "Beverages", icon: CupSoda, background: "from-violet-50/60 to-violet-100/30", border: "border-violet-100/70 hover:border-violet-200", iconBg: "bg-violet-100/80", text: "text-violet-900", iconColor: "text-violet-600", caption: "Cool & refreshments" },
    { name: "Frozen Food", icon: Snowflake, background: "from-cyan-50/60 to-cyan-100/30", border: "border-cyan-100/70 hover:border-cyan-200", iconBg: "bg-cyan-100/80", text: "text-cyan-900", iconColor: "text-cyan-600", caption: "Ready-to-cook meals" },
    { name: "Household", icon: Sparkles, background: "from-teal-50/60 to-teal-100/30", border: "border-teal-100/70 hover:border-teal-200", iconBg: "bg-teal-100/80", text: "text-teal-900", iconColor: "text-teal-600", caption: "Cleaning & essentials" },
    { name: "Personal Care", icon: Flower2, background: "from-pink-50/60 to-pink-100/30", border: "border-pink-100/70 hover:border-pink-200", iconBg: "bg-pink-100/80", text: "text-pink-900", iconColor: "text-pink-600", caption: "Soaps & hygiene products" },
    { name: "Baby Care", icon: Baby, background: "from-indigo-50/60 to-indigo-100/30", border: "border-indigo-100/70 hover:border-indigo-200", iconBg: "bg-indigo-100/80", text: "text-indigo-900", iconColor: "text-indigo-600", caption: "Baby care essentials" },
  ];

  return (
    <section id="categories-section" className="w-full py-16 px-4 md:px-8 bg-[#f4f3ed] border-b border-slate-200/50 select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] block font-display">Premium Sourcing</span>
            <h2 className="font-display text-3xl font-extrabold text-brand-primary tracking-tight">Shop by Category</h2>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-xs font-black text-brand-primary hover:text-brand-accent transition-colors uppercase tracking-[0.22em]">
            <span>See Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <motion.div 
                key={cat.name} 
                initial={{ opacity: 0, y: 12 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ type: "spring", damping: 20, stiffness: 180, delay: index * 0.03 }}
              >
                <Link 
                  href={`/products?category=${encodeURIComponent(cat.name)}`} 
                  className={`group flex flex-col items-start gap-4 rounded-[28px] border ${cat.border} bg-gradient-to-br ${cat.background} p-5 shadow-soft hover:shadow-md transition-all duration-350 h-full hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                    <IconComponent className={`w-5.5 h-5.5 ${cat.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <span className={`text-sm font-black ${cat.text} font-display block`}>
                      {cat.name}
                    </span>
                    <p className="text-[10.5px] font-medium text-slate-500 leading-tight">
                      {cat.caption}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
