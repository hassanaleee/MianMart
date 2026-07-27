"use client";
 
import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { Heart, Plus, Minus, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductImage from "./ProductImage";
 
interface ProductCardProps {
  product: Product;
}
 
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
 
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(product.id);
  const finalPrice = product.price * (1 - (product.discount || 0) / 100);
 
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast(`Added ${product.name} to cart!`, "success");
  };
 
  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };
 
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
    if (quantity === 1) {
      toast(`Removed ${product.name} from cart`, "info");
    }
  };
 
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (isWishlisted) {
      toast(`Removed ${product.name} from wishlist`, "info");
    } else {
      toast(`Added ${product.name} to wishlist!`, "success");
    }
  };
 
  // Category-based subtle color schemes
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Fruits":
        return {
          cardBg: "bg-[#fffaf5] hover:bg-[#fff7ef]",
          border: "border-orange-100/70 hover:border-orange-300/60",
          brandText: "text-orange-600",
          buttonColor: "hover:bg-orange-500 hover:border-orange-500 hover:text-white text-orange-600 border-orange-200",
          qtyColor: "bg-orange-500 border-orange-500",
        };
      case "Vegetables":
        return {
          cardBg: "bg-[#f8fdf9] hover:bg-[#f1faf3]",
          border: "border-emerald-100/70 hover:border-emerald-300/60",
          brandText: "text-emerald-600",
          buttonColor: "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white text-emerald-600 border-emerald-200",
          qtyColor: "bg-emerald-500 border-emerald-500",
        };
      case "Dairy":
        return {
          cardBg: "bg-[#f6faff] hover:bg-[#ebf4ff]",
          border: "border-sky-100/70 hover:border-sky-300/60",
          brandText: "text-sky-600",
          buttonColor: "hover:bg-sky-500 hover:border-sky-500 hover:text-white text-sky-600 border-sky-200",
          qtyColor: "bg-sky-500 border-sky-500",
        };
      case "Bakery":
        return {
          cardBg: "bg-[#fffdf7] hover:bg-[#fff9eb]",
          border: "border-amber-100/60 hover:border-amber-300/60",
          brandText: "text-amber-700",
          buttonColor: "hover:bg-amber-600 hover:border-amber-600 hover:text-white text-amber-700 border-amber-200",
          qtyColor: "bg-amber-600 border-amber-600",
        };
      case "Frozen Food":
        return {
          cardBg: "bg-[#f8fafc] hover:bg-[#f1f5f9]",
          border: "border-indigo-150/70 hover:border-indigo-300/60",
          brandText: "text-indigo-600",
          buttonColor: "hover:bg-indigo-600 hover:border-indigo-600 hover:text-white text-indigo-600 border-indigo-200",
          qtyColor: "bg-indigo-600 border-indigo-600",
        };
      case "Household":
        return {
          cardBg: "bg-[#faf9ff] hover:bg-[#f3f0ff]",
          border: "border-purple-100/70 hover:border-purple-300/60",
          brandText: "text-purple-600",
          buttonColor: "hover:bg-purple-500 hover:border-purple-500 hover:text-white text-purple-600 border-purple-200",
          qtyColor: "bg-purple-500 border-purple-500",
        };
      case "Beverages":
        return {
          cardBg: "bg-[#f4fefd] hover:bg-[#e0faf7]",
          border: "border-cyan-100/70 hover:border-cyan-300/60",
          brandText: "text-cyan-600",
          buttonColor: "hover:bg-cyan-500 hover:border-cyan-500 hover:text-white text-cyan-600 border-cyan-200",
          qtyColor: "bg-cyan-500 border-cyan-500",
        };
      case "Snacks":
        return {
          cardBg: "bg-[#fffafb] hover:bg-[#fff0f3]",
          border: "border-rose-100/70 hover:border-rose-300/60",
          brandText: "text-rose-600",
          buttonColor: "hover:bg-rose-500 hover:border-rose-500 hover:text-white text-rose-600 border-rose-200",
          qtyColor: "bg-rose-500 border-rose-500",
        };
      case "Personal Care":
        return {
          cardBg: "bg-[#fffafc] hover:bg-[#fff0f6]",
          border: "border-pink-100/70 hover:border-pink-300/60",
          brandText: "text-pink-600",
          buttonColor: "hover:bg-pink-500 hover:border-pink-500 hover:text-white text-pink-600 border-pink-200",
          qtyColor: "bg-pink-500 border-pink-500",
        };
      case "Baby Care":
        return {
          cardBg: "bg-[#f5fdfb] hover:bg-[#e6fcf7]",
          border: "border-teal-100/70 hover:border-teal-300/60",
          brandText: "text-teal-600",
          buttonColor: "hover:bg-teal-500 hover:border-teal-500 hover:text-white text-teal-600 border-teal-200",
          qtyColor: "bg-teal-500 border-teal-500",
        };
      default:
        return {
          cardBg: "bg-white hover:bg-slate-50/50",
          border: "border-[#efe9dc]/50 hover:border-slate-350/65",
          brandText: "text-brand-primary/55",
          buttonColor: "hover:bg-brand-primary hover:border-brand-primary hover:text-white text-brand-primary border-slate-200",
          qtyColor: "bg-brand-primary border-brand-primary",
        };
    }
  };
 
  const styles = getCategoryStyles(product.category);
 
  return (
    <motion.div 
      whileHover={{ y: -8, boxShadow: "var(--shadow-premium)" }} 
      transition={{ type: "spring", damping: 20, stiffness: 180 }} 
      className={`rounded-[28px] border p-4.5 sm:p-5 flex flex-col relative shadow-soft overflow-hidden group select-none transition-all duration-300 ${styles.cardBg} ${styles.border}`}
    >
      {/* Floating Badges (Top-Left) */}
      <div className="absolute top-4.5 left-4.5 z-10 flex flex-col gap-1.5 items-start">
        {product.badge && (
          <span className="bg-brand-primary text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-[0.2em] shadow-sm font-display">
            {product.badge}
          </span>
        )}
        {product.discount > 0 && (
          <span className="bg-gradient-to-r from-orange-450 to-brand-accent text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-[0.2em] shadow-sm font-display">
            {product.discount}% OFF
          </span>
        )}
      </div>
 
      {/* Floating Wishlist Button (Top-Right) */}
      <button 
        onClick={handleWishlistToggle} 
        className="absolute top-4.5 right-4.5 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-100 hover:bg-white text-slate-450 hover:text-red-500 shadow-sm z-10 transition-all duration-300 hover:scale-110 cursor-pointer"
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <motion.div animate={{ scale: isWishlisted ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.2 }}>
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
        </motion.div>
      </button>
 
      {/* Product Image Link */}
      <Link 
        href={`/products/${product.id}`} 
        className="block aspect-square w-full mb-5 rounded-[22px] overflow-hidden bg-white border border-slate-100/80 relative"
      >
        <ProductImage 
          src={product.image} 
          alt={product.name} 
          fallbackSrc="/images/products/placeholder.svg" 
          containerClassName="w-full h-full" 
          className="object-cover w-full h-full group-hover:scale-106 transition-transform duration-500 ease-out" 
          loading="lazy" 
        />
      </Link>
 
      {/* Details & Actions */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          {/* Brand */}
          <span className={`text-[9px] font-black uppercase tracking-[0.25em] block font-display ${styles.brandText}`}>
            {product.brand}
          </span>
          
          {/* Title */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-sm font-extrabold text-brand-primary font-display line-clamp-2 leading-tight group-hover:text-brand-accent transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
          
          {/* Weight and Rating */}
          <div className="flex items-center justify-between gap-2 pt-0.5 text-xs font-bold text-slate-500 font-display">
            <span>{product.weight}</span>
            <div className="flex items-center text-amber-500 gap-1 bg-amber-500/5 px-2 py-0.5 rounded-lg border border-amber-500/10">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-slate-700 text-[11px] font-black">{product.rating}</span>
            </div>
          </div>
        </div>
 
        {/* Pricing and Add to Cart Section */}
        <div className="flex items-center justify-between pt-3.5 border-t border-slate-150/40">
          <div className="flex flex-col">
            <span className="text-base font-black text-brand-primary leading-none font-display">
              Rs. {Math.round(finalPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-[11px] text-slate-450 line-through mt-1">
                Rs. {product.price}
              </span>
            )}
          </div>
 
          <div className="h-10 relative min-w-[80px] flex items-center justify-end">
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button 
                  key="add-btn" 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  transition={{ duration: 0.15 }} 
                  onClick={handleAddToCart} 
                  className={`flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl text-xs font-black shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${styles.buttonColor}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </motion.button>
              ) : (
                <motion.div 
                  key="qty-controls" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  transition={{ type: "spring", damping: 15, stiffness: 220 }} 
                  className={`flex items-center text-white rounded-xl overflow-hidden shadow-sm border ${styles.qtyColor}`}
                >
                  <button 
                    onClick={handleDecrement} 
                    className="px-2.5 py-2 hover:bg-black/10 font-extrabold transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-black min-w-[20px] text-center select-none">
                    {quantity}
                  </span>
                  <button 
                    onClick={handleIncrement} 
                    className="px-2.5 py-2 hover:bg-black/10 font-extrabold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
 
export default ProductCard;
