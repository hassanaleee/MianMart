"use client";
 
import React from "react";
import { Sparkles, CheckCircle2, Apple, Home, ShoppingBag, Heart, ShoppingCart, Play, Milk } from "lucide-react";
import { motion } from "framer-motion";
 
export const DownloadApp: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8 select-none bg-white">
      <div className="max-w-7xl mx-auto rounded-[32px] overflow-hidden bg-[linear-gradient(135deg,_#1d3557_0%,_#14243b_100%)] p-8 md:p-12 lg:p-16 relative flex flex-col md:flex-row items-center gap-10 shadow-premium">
        
        {/* Glow backdrop spots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10" />
 
        {/* Content */}
        <div className="flex-1 space-y-5 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-accent/20 border border-brand-accent/30 rounded-full text-brand-accent text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-brand-accent" />
            <span>Mobile App • Coming Soon</span>
          </div>
 
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Order groceries from your phone.
          </h2>
 
          <p className="text-slate-350 font-semibold text-sm leading-relaxed max-w-lg">
            We are working on bringing our premium express delivery experience directly to your mobile devices. Keep an eye out for our official launch!
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-300 pt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Real-time delivery tracking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Exclusive mobile vouchers</span>
            </div>
          </div>
 
          {/* App Badges Mock */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
            <div className="flex items-center gap-2.5 px-4.5 py-2.5 bg-white/5 border border-white/10 rounded-xl cursor-not-allowed opacity-75 hover:bg-white/10 transition-colors">
              <Apple className="w-5 h-5 text-white fill-current" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">App Store</span>
                <span className="text-[11px] text-white font-bold font-display mt-0.5">Coming Soon</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-4.5 py-2.5 bg-white/5 border border-white/10 rounded-xl cursor-not-allowed opacity-75 hover:bg-white/10 transition-colors">
              <Play className="w-5 h-5 text-white fill-current" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">Google Play</span>
                <span className="text-[11px] text-white font-bold font-display mt-0.5">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
 
        {/* Mock Phone Visual (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="w-48 sm:w-56 aspect-[9/18] bg-slate-950 rounded-[36px] border-4 border-slate-800 p-2.5 shadow-premium shrink-0 relative overflow-hidden hidden md:block"
        >
          {/* Speaker / Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          </div>
 
          {/* Phone Screen Mock */}
          <div className="w-full h-full bg-slate-900 rounded-[28px] overflow-hidden p-3 flex flex-col gap-2.5 relative pt-6 text-left select-none">
            {/* Header */}
            <div className="flex items-center justify-between text-[9px] text-slate-450 font-black pb-1.5 border-b border-slate-800/60 font-display">
              <span>MianMart</span>
              <span className="text-brand-accent">⚡ Live</span>
            </div>
 
            {/* Banner */}
            <div className="w-full bg-white/5 border border-white/10 p-2 rounded-xl flex flex-col gap-0.5">
              <span className="text-[7px] text-brand-accent font-black uppercase">Promo Discount</span>
              <span className="text-[9px] text-white font-bold leading-none font-display">WELCOME10</span>
              <span className="text-[7px] text-slate-400 font-semibold">10% off your first checkout!</span>
            </div>
 
            {/* List Item Mock */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest font-display">Deals of the day</span>
              
              <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/5">
                <div className="w-6 h-6 bg-slate-800 rounded-md overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                  <Milk className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[8px] text-white font-bold font-display truncate">Olper&apos;s Milk</h4>
                  <span className="text-[6px] text-slate-400 font-semibold block -mt-0.5">Rs. 295</span>
                </div>
                <div className="w-3.5 h-3.5 bg-brand-primary border border-white/10 rounded-md flex items-center justify-center text-[7px] text-white font-black">
                  +
                </div>
              </div>
 
              <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/5">
                <div className="w-6 h-6 bg-slate-800 rounded-md overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                  <Apple className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[8px] text-white font-bold font-display truncate">Fresh Apples</h4>
                  <span className="text-[6px] text-slate-400 font-semibold block -mt-0.5">Rs. 320</span>
                </div>
                <div className="w-3.5 h-3.5 bg-brand-primary border border-white/10 rounded-md flex items-center justify-center text-[7px] text-white font-black">
                  +
                </div>
              </div>
            </div>
 
            {/* Phone bottom bar */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[7px] text-slate-500 bg-slate-950 p-1.5 rounded-full border border-slate-850">
              <Home className="w-3 h-3 text-brand-accent" />
              <ShoppingBag className="w-3 h-3 text-slate-500" />
              <Heart className="w-3 h-3 text-slate-500" />
              <ShoppingCart className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </motion.div>
 
      </div>
    </section>
  );
};
 
export default DownloadApp;
