"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import ProductImage from "@/components/ui/ProductImage";
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailsClient: React.FC<ProductDetailsClientProps> = ({
  product,
  relatedProducts,
}) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(product.id);

  // Thumbnail selection
  const [selectedImage, setSelectedImage] = useState(product.image);

  const thumbnails = [
    product.image,
    product.image, // simulated variants
    product.image,
  ];

  // Price calculations
  const finalPrice = product.price * (1 - (product.discount || 0) / 100);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast(`Added ${product.name} to cart!`, "success");
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
    if (quantity === 1) {
      toast(`Removed ${product.name} from cart`, "info");
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    if (isWishlisted) {
      toast(`Removed ${product.name} from wishlist`, "info");
    } else {
      toast(`Added ${product.name} to wishlist!`, "success");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex-1 select-none">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-6">
          <Link href="/" className="hover:text-brand-primary">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-brand-primary">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-primary">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-650 truncate max-w-[150px] font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start bg-white/90 border border-slate-200 rounded-[32px] p-6 md:p-10 shadow-soft mb-16">
          <div className="space-y-4 w-full">
            <div className="w-full aspect-square relative rounded-[24px] overflow-hidden border border-slate-200 bg-[#fafaf8] p-4 flex items-center justify-center">
              <ProductImage src={selectedImage} alt={product.name} fallbackSrc="/images/products/placeholder.svg" className="object-cover max-w-full max-h-full rounded-[16px]" />
              {product.discount > 0 && <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-black px-2.5 py-1 rounded-full z-10 shadow-md">{product.discount}% OFF</span>}
            </div>

            <div className="flex gap-3">
              {thumbnails.map((thumb, idx) => (
                <button key={idx} onClick={() => setSelectedImage(thumb)} className={`w-18 h-18 rounded-2xl overflow-hidden border-2 bg-[#fafaf8] p-1.5 flex items-center justify-center transition-all cursor-pointer ${selectedImage === thumb ? "border-brand-primary scale-[1.02] shadow-sm" : "border-slate-100 opacity-60 hover:opacity-100"}`}>
                  <ProductImage src={thumb} alt={`${product.name} thumbnail`} fallbackSrc="/images/products/placeholder.svg" className="object-cover max-w-full max-h-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-black text-brand-primary uppercase tracking-[0.28em] bg-brand-primary-light px-3.5 py-1.5 rounded-xl font-display">{product.brand}</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-success border border-emerald-100 bg-brand-success-light px-3 py-1 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>In Stock ({product.stock} available)</span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight">{product.name}</h1>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.24em]">Pack weight / size: <span className="text-slate-700 font-black">{product.weight}</span></p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 py-3 border-y border-slate-100 text-xs font-bold text-slate-500">
              <div className="flex items-center text-amber-500 gap-1 bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-100/50"><Star className="w-4 h-4 fill-amber-500 text-amber-500" /><span>{product.rating} Rating</span></div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100"><TrendingUp className="w-4 h-4 text-brand-primary" /><span>{product.orders} Orders</span></div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100"><Clock className="w-4 h-4 text-brand-primary" /><span>Delivered in 30–45 mins</span></div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-brand-primary font-display">Rs. {Math.round(finalPrice)}</span>
              {product.discount > 0 && <span className="text-lg text-slate-400 line-through font-semibold">Rs. {product.price}</span>}
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-slate-450 uppercase tracking-[0.26em] font-display">Details</h4>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
              <div className="flex-1 min-h-[48px] relative">
                <AnimatePresence mode="wait">
                  {quantity === 0 ? (
                    <motion.button key="add-btn" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={handleAddToCart} className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-[0.22em] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer">
                      <ShoppingCart className="w-4.5 h-4.5 text-white" />
                      <span>Add to Cart</span>
                    </motion.button>
                  ) : (
                    <motion.div key="qty-selector" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex items-center justify-between border-2 border-brand-primary bg-white rounded-2xl p-0.5 shadow-sm max-w-sm">
                      <button onClick={handleDecrement} className="p-3 hover:bg-brand-primary-light text-brand-primary font-black rounded-xl transition-all cursor-pointer"><Minus className="w-4 h-4" /></button>
                      <span className="text-xs font-black text-brand-primary font-display">{quantity} Pack(s) in Cart</span>
                      <button onClick={handleIncrement} className="p-3 hover:bg-brand-primary-light text-brand-primary font-black rounded-xl transition-all cursor-pointer"><Plus className="w-4 h-4" /></button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={handleWishlistToggle} className={`px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.22em] border transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${isWishlisted ? "bg-brand-accent-light border-brand-accent/25 text-brand-accent-hover" : "bg-white border-slate-200 text-slate-650 hover:border-slate-350 hover:bg-slate-50"}`}>
                <Heart className={`w-4.5 h-4.5 ${isWishlisted ? "fill-current" : ""}`} />
                <span>{isWishlisted ? "Saved" : "Save Item"}</span>
              </button>
            </div>

            <div className="space-y-2 pt-2 text-xs font-bold text-slate-550">
              <div className="flex items-center gap-2 text-brand-success"><CheckCircle2 className="w-4.5 h-4.5 shrink-0" /><span>100% Quality Checked Sourcing</span></div>
              <div className="flex items-center gap-2 text-brand-success"><CheckCircle2 className="w-4.5 h-4.5 shrink-0" /><span>Original Packaging and Brand Assurance</span></div>
              <div className="flex items-center gap-2 text-brand-success"><CheckCircle2 className="w-4.5 h-4.5 shrink-0" /><span>Hygienically Packed and Delivered by MianMart rider</span></div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-brand-primary/60 uppercase tracking-[0.28em] block font-display">Recommendation List</span>
              <h3 className="font-display text-2xl font-extrabold text-brand-primary tracking-tight">Related Products</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailsClient;
