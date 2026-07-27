"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  type: "cart" | "wishlist" | "search" | "not-found";
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  suggestedSearches?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionText,
  actionHref = "/products",
  onActionClick,
  suggestedSearches = false,
}) => {

  // Handcrafted premium SVGs matching brand colours
  const renderSvg = () => {
    switch (type) {
      case "cart":
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#EBF2FA" opacity="0.5" />
            <motion.path
              d="M 60,70 L 75,70 L 90,130 L 140,130 L 155,80 L 78,80"
              stroke="#1D3557"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <circle cx="95" cy="155" r="10" fill="#F4A261" />
            <circle cx="135" cy="155" r="10" fill="#F4A261" />
            {/* Organic Floating Bubbles */}
            <motion.circle
              cx="110" cy="50" r="6" fill="#2A9D8F" opacity="0.8"
              animate={{ y: [0, -15, 0], opacity: [0.8, 0, 0.8] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            />
            <motion.circle
              cx="135" cy="65" r="4" fill="#F4A261" opacity="0.6"
              animate={{ y: [0, -20, 0], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
            />
          </svg>
        );
      case "wishlist":
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#FFF5EC" opacity="0.6" />
            <motion.path
              d="M100 137C100 137 145 109 145 83C145 62 129 49 112.5 49C102.5 49 97 55 97 55L100 58L103 55C103 55 97.5 49 87.5 49C71 49 55 62 55 83C55 109 100 137 100 137Z"
              fill="#F4A261"
              opacity="0.15"
              stroke="#F4A261"
              strokeWidth="5"
              strokeLinejoin="round"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <path
              d="M100 142C100 142 150 112 150 85C150 60 132 46 113.5 46C103.5 46 97 53 97 53L100 56L103 53C103 53 96.5 46 86.5 46C68 46 50 60 50 85C50 112 100 142 100 142Z"
              stroke="#1D3557"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <motion.circle
              cx="75" cy="55" r="4.5" fill="#2A9D8F"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            />
          </svg>
        );
      case "search":
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#E6F6F4" opacity="0.6" />
            <motion.g
              animate={{ rotate: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <circle cx="90" cy="90" r="28" stroke="#1D3557" strokeWidth="5.5" />
              <path d="M110 110 L145 145" stroke="#1D3557" strokeWidth="5.5" strokeLinecap="round" />
            </motion.g>
            <path d="M60 140 H140" stroke="#f1f0ea" strokeWidth="3" strokeDasharray="6 6" />
          </svg>
        );
      case "not-found":
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#F1F0EA" opacity="0.5" />
            <text x="100" y="105" font-family="'Outfit', sans-serif" font-weight="900" font-size="54" fill="#1D3557" text-anchor="middle">404</text>
            <path d="M 60,135 Q 100,105 140,135" stroke="#F4A261" strokeWidth="5" strokeLinecap="round" />
            <circle cx="75" cy="95" r="3" fill="#1D3557" />
            <circle cx="125" cy="95" r="3" fill="#1D3557" />
          </svg>
        );
    }
  };

  const defaultTitle = () => {
    switch (type) {
      case "cart": return "Your shopping cart is empty";
      case "wishlist": return "Your wishlist is empty";
      case "search": return "No products found";
      case "not-found": return "Page Not Found";
    }
  };

  const defaultDescription = () => {
    switch (type) {
      case "cart": return "Add items to your cart to see them here and place an order.";
      case "wishlist": return "Tap the heart icon on any product to save it to your wishlist.";
      case "search": return "We couldn't find matches. Try searching for Milk, Eggs, Bread, or Rice.";
      case "not-found": return "The page you are looking for might have been removed or renamed.";
    }
  };

  const defaultActionText = () => {
    switch (type) {
      case "cart": return "Start Shopping";
      case "wishlist": return "Explore Catalog";
      case "search": return "Clear Search & Reset";
      case "not-found": return "Go Back Home";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-100 rounded-[28px] p-8 md:p-12 text-center flex flex-col items-center justify-center gap-5 shadow-soft max-w-xl mx-auto select-none"
    >
      {/* Handcrafted Graphic */}
      {renderSvg()}

      <div className="space-y-1.5">
        <h3 className="font-display font-extrabold text-brand-primary text-xl tracking-tight">
          {title || defaultTitle()}
        </h3>
        <p className="text-xs text-slate-450 font-semibold leading-relaxed max-w-sm mx-auto">
          {description || defaultDescription()}
        </p>
      </div>

      {suggestedSearches && (
        <div className="flex flex-col items-center gap-2.5 pt-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-display">
            Try these searches
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Milk", "Eggs", "Bread", "Rice", "Cooking Oil"].map((item) => (
              <Link
                key={item}
                href={`/products?q=${encodeURIComponent(item)}`}
                className="px-3.5 py-1.5 bg-slate-50 border border-slate-200/80 hover:border-brand-primary hover:text-brand-primary rounded-xl text-xs font-bold text-slate-650 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}

      {onActionClick ? (
        <button
          onClick={onActionClick}
          className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 mt-2 cursor-pointer"
        >
          {actionText || defaultActionText()}
        </button>
      ) : (
        <Link
          href={actionHref}
          className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 mt-2 inline-flex items-center gap-2"
        >
          {type === "not-found" && <ArrowLeft className="w-4 h-4" />}
          <span>{actionText || defaultActionText()}</span>
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;
