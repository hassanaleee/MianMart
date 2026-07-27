"use client";
 
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBasket, Sparkles, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductImage from "@/components/ui/ProductImage";
 
export const HeroBanner: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
 
  const popularTags = ["Milk", "Eggs", "Bread", "Rice", "Cooking Oil"];
 
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };
 
  const handleTagClick = (tag: string) => {
    router.push(`/products?q=${encodeURIComponent(tag)}`);
  };
 
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0F1E32] via-[#1D3557] to-[#122237] pt-16 pb-28 md:pt-24 md:pb-36 px-4 md:px-8 select-none">
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-[10%] w-[32rem] h-[32rem] rounded-full bg-brand-accent/15 blur-[120px] -z-10 organic-blob" />
      <div className="absolute bottom-20 right-[5%] w-[28rem] h-[28rem] rounded-full bg-brand-success/10 blur-[100px] -z-10 organic-blob-fast" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[#EBF2FA]/5 blur-[140px] -z-10" />
 
      {/* Wave pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.035)_1px,_transparent_1px)] bg-[length:24px_24px] opacity-60 -z-10" />
 
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center relative z-10">
        <div className="space-y-7 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ type: "spring", damping: 16 }} 
            className="inline-flex items-center gap-2 px-4 py-1.75 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-black uppercase tracking-[0.28em] text-brand-accent shadow-md"
          >
            <Zap className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
            <span className="text-white">Express delivery • 30–45 mins</span>
          </motion.div>
 
          <motion.h1 
            initial={{ opacity: 0, y: 22 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.55, delay: 0.08 }} 
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.04] max-w-xl mx-auto lg:mx-0"
          >
            Fresh staples, styled for modern homes in <span className="text-brand-accent">Mian Channu</span>.
          </motion.h1>
 
          <motion.p 
            initial={{ opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.16 }} 
            className="text-slate-300 font-semibold text-sm sm:text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Premium grocery delivery with dependable local sourcing, polished service, and a design that feels as thoughtful as the products themselves.
          </motion.p>
 
          {/* Taller, More Premium Search Bar */}
          <motion.form 
            onSubmit={handleSearchSubmit} 
            initial={{ opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.24 }} 
            className="relative max-w-xl mx-auto lg:mx-0 w-full shadow-premium rounded-[24px] bg-white border border-slate-100 p-2 flex items-center"
          >
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search e.g. Olper's Milk, Tapal Tea..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <button 
              type="submit" 
              className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-black py-3.5 px-6 rounded-2xl shadow-md transition-all duration-200 cursor-pointer active:scale-95"
            >
              Search
            </button>
          </motion.form>
 
          {/* Elegant Pill Tags for Dark Background */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: 0.3 }} 
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-bold text-slate-300"
          >
            <span>Popular:</span>
            {popularTags.map((tag) => (
              <button 
                key={tag} 
                onClick={() => handleTagClick(tag)} 
                className="px-4 py-1.75 bg-white/5 hover:bg-white hover:text-brand-primary rounded-full border border-white/10 text-slate-200 font-bold transition-all shadow-soft cursor-pointer active:scale-95"
              >
                {tag}
              </button>
            ))}
          </motion.div>
 
          {/* Larger CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: 0.36 }} 
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <Link 
              href="/products" 
              className="flex items-center gap-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white font-black text-xs uppercase tracking-[0.24em] px-8 py-4.5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <ShoppingBasket className="w-4.5 h-4.5" />
              <span>Shop Essentials</span>
            </Link>
            <button 
              onClick={() => { const element = document.getElementById("categories-section"); if (element) element.scrollIntoView({ behavior: "smooth" }); }} 
              className="px-8 py-4.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-[0.24em] rounded-2xl shadow-soft transition-all active:scale-[0.98] cursor-pointer"
            >
              Browse Categories
            </button>
          </motion.div>
        </div>
 
        {/* Floating Cards with Glow and shadows */}
        <div className="relative min-h-[380px] md:min-h-[460px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl" />
          <div className="absolute left-6 top-8 h-32 w-32 rounded-full border border-brand-accent/20 bg-brand-accent/5 blur-sm" />
          <div className="absolute right-10 bottom-8 h-28 w-28 rounded-full border border-brand-primary/20 bg-brand-primary/5 blur-sm" />
 
          {/* Showcase card 1: Olper's Milk */}
          <motion.div 
            animate={{ y: [0, -12, 0] }} 
            transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }} 
            className="absolute top-1/2 left-[8%] -translate-y-1/2 w-40 sm:w-44 bg-white border border-slate-100 p-3.5 rounded-[24px] shadow-premium z-20 hover:scale-[1.02] transition-transform cursor-pointer" 
            onClick={() => router.push("/products/p10")}
          >
            <div className="w-full aspect-square rounded-[18px] bg-[#fafaf8] overflow-hidden mb-3 p-2 flex items-center justify-center">
              <ProductImage src="olpers-milk-1l.png" alt="Olper's Milk" className="max-w-full max-h-full object-cover" />
            </div>
            <span className="text-[9px] font-black text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-display">OLPER&apos;S</span>
            <h4 className="text-xs font-bold text-slate-700 mt-1 truncate font-display">Olper&apos;s Milk</h4>
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-100">
              <span className="text-xs font-black text-brand-primary">Rs. 295</span>
              <span className="text-[8px] bg-brand-accent text-white font-black px-1.5 py-0.5 rounded-md">1 Litre</span>
            </div>
          </motion.div>
 
          {/* Showcase card 2: Red Delicious Apples */}
          <motion.div 
            animate={{ y: [-10, 8, -10] }} 
            transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }} 
            className="absolute top-6 right-6 w-44 sm:w-48 bg-white border border-slate-100 p-4 rounded-[24px] shadow-premium z-10 hover:scale-[1.02] transition-transform cursor-pointer" 
            onClick={() => router.push("/products/p1")}
          >
            <div className="w-full aspect-square rounded-[18px] bg-[#fafaf8] overflow-hidden mb-3 p-2 flex items-center justify-center">
              <ProductImage src="apples-red-delicious.png" alt="Fresh Apples" className="max-w-full max-h-full object-cover" />
            </div>
            <span className="text-[9px] font-black text-brand-primary bg-brand-primary-light px-2 py-0.5 rounded-full font-display">FRESH FRUIT</span>
            <h4 className="text-xs font-bold text-slate-700 mt-1 truncate font-display">Red Delicious Apples</h4>
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-100">
              <span className="text-xs font-black text-brand-primary">Rs. 320</span>
              <span className="text-[8px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded-md">1 kg</span>
            </div>
          </motion.div>
 
          {/* Showcase card 3: Tapal Tea */}
          <motion.div 
            animate={{ y: [10, -10, 10] }} 
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} 
            className="absolute bottom-6 right-16 w-36 sm:w-40 bg-white border border-slate-100 p-3 rounded-[20px] shadow-premium z-20 hover:scale-[1.02] transition-transform cursor-pointer" 
            onClick={() => router.push("/products/p21")}
          >
            <div className="w-full aspect-square rounded-[16px] bg-[#fafaf8] overflow-hidden mb-3 p-2 flex items-center justify-center">
              <ProductImage src="tapal-danedar.png" alt="Tapal Tea" className="max-w-full max-h-full object-cover" />
            </div>
            <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-display">TAPAL</span>
            <h4 className="text-xs font-bold text-slate-700 mt-1 truncate font-display">Tapal Danedar Tea</h4>
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-100">
              <span className="text-xs font-black text-brand-primary">Rs. 950</span>
              <span className="text-[8px] bg-brand-accent text-white font-black px-1.5 py-0.5 rounded-md">450g</span>
            </div>
          </motion.div>
 
          <div className="absolute bottom-8 left-10 hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-soft">
            <Sparkles className="w-4 h-4 text-brand-accent" />
            Curated daily essentials
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
 
      {/* Curve divider bottom cutout */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] curve-divider">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V30.28A1201.27,1201.27,0,0,1,985.66,92.83Z" fill="#f4f3ed" />
        </svg>
      </div>
    </section>
  );
};
 
export default HeroBanner;
