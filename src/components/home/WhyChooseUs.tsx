"use client";

import React from "react";
import { Clock, HelpCircle, ShieldCheck, Banknote } from "lucide-react";
import { motion } from "framer-motion";

interface USPItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

export const WhyChooseUs: React.FC = () => {
  const usps: USPItem[] = [
    {
      title: "Delivery in 30–45 mins",
      description: "Direct local delivery across Mian Channu city bounds in less than 45 minutes guaranteed.",
      icon: <Clock className="w-6 h-6 text-brand-primary" />,
      bgColor: "bg-brand-primary-light",
    },
    {
      title: "Cash on Delivery",
      description: "No advance payment needed. Pay easily with Cash on Delivery (COD) once you verify your items.",
      icon: <Banknote className="w-6 h-6 text-brand-accent" />,
      bgColor: "bg-brand-accent-light",
    },
    {
      title: "Handpicked Freshness",
      description: "Every fruit, vegetable, and dairy product is hand-checked for size and absolute fresh quality.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-success" />,
      bgColor: "bg-brand-success-light",
    },
    {
      title: "Local Customer Care",
      description: "Got an issue? Ring our dedicated call support at +92 300 1234567 for instant order assistance.",
      icon: <HelpCircle className="w-6 h-6 text-purple-600" />,
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 select-none bg-[#f4f3ed] border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black text-brand-primary/60 uppercase tracking-[0.3em] block font-display">Our Services & USPs</span>
          <h2 className="font-display text-3xl font-extrabold text-brand-primary tracking-tight">Why Choose MianMart?</h2>
          <p className="text-slate-500 text-xs font-semibold">We are building the smartest and fastest grocery store experience inside Mian Channu</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, index) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-soft hover:shadow-md hover:border-slate-200/50 transition-all flex flex-col items-center text-center gap-4 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${usp.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0`}>
                {usp.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-base text-slate-700 leading-snug">
                  {usp.title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  {usp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
