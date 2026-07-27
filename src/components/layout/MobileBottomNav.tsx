"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Home,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Info,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();
  const { wishlistItems } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/70 py-2 px-3 flex items-center justify-around z-40 md:hidden shadow-[0_-12px_30px_-18px_rgba(29,53,87,0.45)]">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all duration-200 ${isActive("/") ? "text-brand-primary scale-105" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Home className="w-5.5 h-5.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/products"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all duration-200 ${isActive("/products") ? "text-brand-primary scale-105" : "text-slate-400 hover:text-slate-600"}`}
        >
          <ShoppingBag className="w-5.5 h-5.5" />
          <span>Shop</span>
        </Link>

        <Link
          href="/wishlist"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all duration-200 relative ${isActive("/wishlist") ? "text-brand-primary scale-105" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Heart className="w-5.5 h-5.5" />
          <span>Wishlist</span>
          {wishlistItems.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </Link>

        <button
          onClick={() => setCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 relative transition-all duration-200"
        >
          <ShoppingCart className="w-5.5 h-5.5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsMenuOpen(true)}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all duration-200 ${isMenuOpen ? "text-brand-primary" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Menu className="w-5.5 h-5.5" />
          <span>Menu</span>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 md:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[28px] p-6 pb-10 z-50 md:hidden flex flex-col gap-6 shadow-premium max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-2 mb-1" />

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-brand-primary" />
                  </div>
                  <span className="font-display text-lg font-bold text-slate-800">MianMart Quick Menu</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 hover:bg-brand-primary-light hover:text-brand-primary rounded-2xl flex flex-col gap-2 font-semibold text-slate-700 text-sm border border-slate-100 hover:border-brand-primary/20 transition-all duration-200">
                  <span className="text-xl">🏠</span>
                  <span>Go to Home</span>
                </Link>
                <Link href="/products" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 hover:bg-brand-primary-light hover:text-brand-primary rounded-2xl flex flex-col gap-2 font-semibold text-slate-700 text-sm border border-slate-100 hover:border-brand-primary/20 transition-all duration-200">
                  <span className="text-xl">🛍</span>
                  <span>Browse Products</span>
                </Link>
                <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 hover:bg-brand-primary-light hover:text-brand-primary rounded-2xl flex flex-col gap-2 font-semibold text-slate-700 text-sm border border-slate-100 hover:border-brand-primary/20 transition-all duration-200">
                  <span className="text-xl">❤️</span>
                  <span>Your Wishlist ({wishlistItems.length})</span>
                </Link>
                <button onClick={() => { setIsMenuOpen(false); setCartOpen(true); }} className="p-4 bg-slate-50 hover:bg-brand-primary-light hover:text-brand-primary rounded-2xl flex flex-col gap-2 text-left font-semibold text-slate-700 text-sm border border-slate-100 hover:border-brand-primary/20 transition-all duration-200">
                  <span className="text-xl">🛒</span>
                  <span>View Cart ({cartCount})</span>
                </button>
              </div>

              <div className="h-px bg-slate-100 my-1" />

              <div className="flex flex-col gap-3 text-xs font-semibold text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>📍 Delivering across Mian Channu city</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>⚡ Delivery within 30 to 45 mins</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Support: +92 300 1234567</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Payment Mode: Cash on Delivery (COD)</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileBottomNav;
