"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import {
  ShoppingBag,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  MapPin,
  Clock,
} from "lucide-react";
import { SearchBar } from "./SearchBar";

const SearchBarFallback = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <div className={isMobile ? "relative flex-1" : "relative flex-1 max-w-lg mx-4"}>
      <div className="relative w-full">
        <input
          type="text"
          disabled
          placeholder={isMobile ? "Search groceries..." : "Search groceries (e.g. Milk, Eggs, Bread...)"}
          className="w-full pl-11 pr-4 py-2.5 bg-slate-50/70 border border-slate-200/70 rounded-2xl text-xs font-semibold outline-none"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { cartCount, setCartOpen } = useCart();
  const { wishlistItems } = useWishlist();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLocationClick = () => {
    toast("MianMart delivers fresh groceries across Mian Channu city limits in 30-45 minutes!", "success");
  };

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-4 md:px-8 py-3 select-none">
      <div className="max-w-7xl mx-auto floating-glass-nav rounded-[30px] px-3 sm:px-4 md:px-5 py-3 flex items-center justify-between gap-3 shadow-premium">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
            </div>
            <span className="font-display text-xl md:text-2xl font-black tracking-tight text-brand-primary">
              Mian<span className="text-brand-accent">Mart</span>
              <span className="text-brand-accent">.</span>
            </span>
          </Link>

          <button 
            onClick={handleLocationClick}
            className="hidden lg:flex items-center gap-2 border-l border-slate-200 pl-4 text-left leading-tight cursor-pointer hover:opacity-85 transition-opacity"
            title="View Delivery Area"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-success/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-brand-success" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">DELIVERING TO</span>
              <span className="text-xs font-black text-brand-primary flex items-center gap-1">
                Mian Channu, PK
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse inline-block"></span>
              </span>
            </div>
          </button>
        </div>

        <div className="hidden md:block flex-1 max-w-lg mx-2">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden lg:flex items-center gap-5 text-[11px] font-black text-slate-500 uppercase tracking-[0.24em]">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <Link href="/products" className="hover:text-brand-primary transition-colors">Catalog</Link>
          </nav>

          <Link
            href="/wishlist"
            className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-white rounded-xl relative transition-all"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 transition-transform duration-200 active:scale-125" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 px-3.5 sm:px-4.5 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] font-black">
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-500 hover:bg-white rounded-xl md:hidden cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      <div className="md:hidden w-full max-w-7xl mx-auto px-1 mt-2.5">
        <div className="bg-white rounded-2xl border border-slate-100 p-2 shadow-soft flex items-center gap-2">
          <Suspense fallback={<SearchBarFallback isMobile />}>
            <SearchBar isMobile />
          </Suspense>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[125px] bg-slate-900/30 backdrop-blur-xs z-35 md:hidden">
          <div className="w-[280px] h-[calc(100vh-140px)] bg-white p-6 rounded-r-3xl shadow-premium flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Navigation</span>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-slate-700 hover:text-brand-primary text-base font-bold transition-colors">Home</Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-slate-700 hover:text-brand-primary text-base font-bold transition-colors">Store Catalog</Link>
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-slate-700 hover:text-brand-primary text-base font-bold transition-colors">Wishlist ({wishlistItems.length})</Link>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Info</span>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100/70">
                <MapPin className="w-4 h-4 text-brand-success shrink-0" />
                <span>Delivering inside Mian Channu city limits</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100/70">
                <Clock className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Rider Delivery: 30–45 mins</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
