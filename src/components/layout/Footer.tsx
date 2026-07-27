"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [emailInput, setEmailInput] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    toast("Thank you! We will notify you when we launch.", "success");
    setEmailInput("");
  };

  return (
    <footer className="w-full bg-[#14243b] text-slate-350 pt-16 pb-24 md:pb-12 px-4 md:px-8 border-t border-[#1d3557] select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Story & Info */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-brand-accent" />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Mian<span className="text-brand-accent">Mart</span>
              <span className="text-brand-accent">.</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            MianMart is a premium express delivery startup. Sourcing daily essentials directly from Pakistan&apos;s most trusted brands, checked for absolute quality, and delivered to your doorstep in 30-45 minutes.
          </p>
          <div className="flex flex-col gap-2.5 pt-2 text-xs text-slate-400 font-bold">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
              <span>G.T. Road, Mian Channu, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-accent shrink-0" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Open Daily: 08:00 AM - 11:00 PM</span>
            </div>
          </div>
        </div>

        {/* Quick Links / Categories */}
        <div className="space-y-4">
          <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">Product Catalog</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold text-slate-400">
            <Link href="/products?category=Fruits" className="hover:text-brand-accent transition-colors">Fruits</Link>
            <Link href="/products?category=Vegetables" className="hover:text-brand-accent transition-colors">Vegetables</Link>
            <Link href="/products?category=Dairy" className="hover:text-brand-accent transition-colors">Dairy</Link>
            <Link href="/products?category=Bakery" className="hover:text-brand-accent transition-colors">Bakery</Link>
            <Link href="/products?category=Snacks" className="hover:text-brand-accent transition-colors">Snacks</Link>
            <Link href="/products?category=Beverages" className="hover:text-brand-accent transition-colors">Beverages</Link>
            <Link href="/products?category=Frozen Food" className="hover:text-brand-accent transition-colors">Frozen</Link>
            <Link href="/products?category=Household" className="hover:text-brand-accent transition-colors">Household</Link>
          </div>
        </div>
 
        {/* Deliver Areas & COD Info */}
        <div className="space-y-4">
          <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">Help & Support</h4>
          <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-bold">
            <Link href="/faq" className="hover:text-brand-accent transition-colors flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> FAQ & Delivery Support
            </Link>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-success" /> Cash on Delivery (COD)
            </div>
            <div className="text-[10px] text-slate-500 mt-2 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800 font-semibold leading-relaxed">
              Delivery Areas: Civil Lines, Muslim Town, Iqbal Town, Tariq Road, Ghulam Hussain Block, Rail Bazar, and all urban residential sectors in Mian Channu.
            </div>
          </div>
        </div>

        {/* Newsletter Signup (Coming Soon) */}
        <div className="space-y-4">
          <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">Stay Tuned</h4>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-accent/15 border border-brand-accent/25 rounded-md text-brand-accent text-[9px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Newsletter (Coming Soon)</span>
          </div>
          <p className="text-[10.5px] text-slate-400 font-semibold">
            Subscribe to receive launch announcements, discount coupons, and daily deals alerts in Mian Channu.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 bg-slate-900/60 p-1 rounded-xl border border-slate-850">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs font-semibold text-white outline-none border-none"
            />
            <button
              type="submit"
              className="p-2 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg transition-colors cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto h-px bg-slate-800 my-10" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <span>© {currentYear} MianMart Pakistan. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
