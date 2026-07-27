"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { wishlistItems, clearWishlist } = useWishlist();

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex-1 select-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] block font-display">Saved Staples</span>
            <h1 className="font-display text-3xl font-extrabold text-brand-primary tracking-tight mt-0.5">My Wishlist</h1>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved</p>
          </div>

          {/* Quick Clear Action */}
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-slate-450 hover:text-red-500 text-xs font-bold transition-all border border-slate-200 hover:border-red-200 bg-white rounded-xl px-4 py-2.5 shadow-soft cursor-pointer active:scale-95"
            >
              Clear All Saved
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          /* Handcrafted Illustrated Empty State */
          <EmptyState
            type="wishlist"
            title="Your wishlist is empty"
            description="Tap the heart icon on any grocery product card to save it here for quick and convenient checkout."
            actionHref="/products"
            actionText="Start Browsing"
            suggestedSearches
          />
        ) : (
          /* Wishlisted Items Grid */
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-200"
          >
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </main>

      <Footer />
    </>
  );
}
