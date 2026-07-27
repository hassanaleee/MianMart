"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  CheckCircle,
  Truck,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductImage from "@/components/ui/ProductImage";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, total, subtotal, discountAmount, deliveryFee, clearCart } = useCart();
  const { toast } = useToast();

  // States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if cart is empty and order wasn't just placed
  useEffect(() => {
    if (cartItems.length === 0 && !orderSuccess) {
      router.replace("/cart");
    }
  }, [cartItems, orderSuccess, router]);

  const areas = [
    "Civil Lines",
    "Muslim Town",
    "Ghulam Hussain Block",
    "Tariq Road",
    "Iqbal Town",
    "G.T. Road Area",
    "Rail Bazar",
    "Mandi Bazar"
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !area) {
      toast("Please fill in all delivery details", "error");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate order placement
    setTimeout(() => {
      const mockId = "MM-" + Math.floor(10000 + Math.random() * 90000);
      setOrderId(mockId);
      setOrderSuccess(true);
      setIsSubmitting(false);
      clearCart(); // Clear cart items
      toast("Order placed successfully!", "success");
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex-1 select-none">
        
        {/* Progress bar steps indicator */}
        <div className="max-w-xl mx-auto mb-10 text-xs font-bold text-slate-400 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-brand-primary">
            <span className="w-5 h-5 rounded-full bg-brand-primary-light flex items-center justify-center font-black">1</span>
            <span>Shopping Cart</span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
          <div className="flex items-center gap-2 text-brand-primary">
            <span className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center font-black">2</span>
            <span>Delivery Info</span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
          <div className="flex items-center gap-2 text-slate-350">
            <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-black">3</span>
            <span>Confirm Order</span>
          </div>
        </div>

        {/* Success Screen Overlay (Framer Motion) */}
        <AnimatePresence>
          {orderSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="bg-white rounded-[32px] p-6 md:p-10 shadow-2xl text-center max-w-lg w-full border border-slate-100 flex flex-col items-center gap-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-accent via-brand-primary to-brand-success" />
                
                {/* Visual Check icon */}
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 relative">
                  <CheckCircle className="w-10 h-10 fill-current text-brand-success stroke-white" />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-1 rounded-full border-2 border-brand-success/20 -z-10"
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight leading-tight">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-xs text-slate-450 font-bold uppercase tracking-widest">
                    Order Reference ID: <span className="text-brand-accent font-black">{orderId}</span>
                  </p>
                </div>

                {/* Delivery card summary */}
                <div className="w-full bg-[#fafaf8] border border-slate-150 rounded-2xl p-4 text-left space-y-3.5 text-xs font-semibold text-slate-500">
                  <div className="flex items-start gap-2.5">
                    <Truck className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                    <div>
                      <span className="text-brand-primary font-bold block leading-none">Express Delivery</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">Your order will arrive in <span className="text-brand-accent font-black">30–45 minutes</span>.</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                    <div>
                      <span className="text-brand-primary font-bold block leading-none">Rider Destination</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block font-semibold leading-relaxed">
                        {name} ({phone}) <br /> {address}, {area}, Mian Channu
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex items-start gap-2.5">
                    <CreditCard className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                    <div>
                      <span className="text-brand-primary font-bold block leading-none">Payment Method</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">Cash on Delivery (COD)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 leading-relaxed text-xs text-slate-405 font-bold max-w-[280px]">
                  <span>Thank you for shopping with <span className="font-bold text-brand-primary font-display">MianMart</span>!</span>
                  <p className="text-[9.5px] font-semibold text-slate-400">Our delivery rider will ring your phone upon arrival.</p>
                </div>

                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    router.replace("/");
                  }}
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular Layout */}
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white/90 border border-slate-200 rounded-[28px] p-6 md:p-8 shadow-soft space-y-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.28em] block border-b border-slate-100 pb-3.5 font-display">Delivery Information</span>

            <form onSubmit={handlePlaceOrder} className="space-y-5">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-primary outline-none transition-all"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03001234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-primary outline-none transition-all"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Area select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">Area inside Mian Channu</label>
                <div className="relative">
                  <select
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-brand-primary appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your residential area</option>
                    {areas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Street Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">Complete Address</label>
                <div className="relative">
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter house/street number, block details, and landmarks in Mian Channu"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Cash on Delivery info */}
              <div className="p-4 bg-slate-50/70 border border-slate-150 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary-light flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-brand-primary font-display">Cash on Delivery (COD)</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Zero advance payment. Cash pay at door.</p>
                  </div>
                </div>
                <span className="text-[9px] bg-brand-primary-light text-brand-primary font-black px-2.5 py-1 rounded-md uppercase tracking-wider font-display">
                  COD Only
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-brand-primary/60 text-white py-4 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 group cursor-pointer"
              >
                <span>{isSubmitting ? "Placing Order..." : `Place Order (COD) - Rs. ${Math.round(total)}`}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Order items summary review */}
          <div className="bg-white/90 border border-slate-200 rounded-[28px] p-6 shadow-soft space-y-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.28em] block border-b border-slate-100 pb-3.5 font-display">Review Cart</span>

            {/* List scroll */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const finalPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
                return (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-[#fafaf8] shrink-0 p-1 flex items-center justify-center">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        fallbackSrc="/images/products/placeholder.svg"
                        className="object-cover max-w-full max-h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0 font-semibold leading-snug">
                      <h4 className="text-brand-primary truncate font-display">{item.product.name}</h4>
                      <span className="text-slate-400 text-[10px]">
                        {item.product.weight} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-extrabold text-brand-primary text-right">
                      Rs. {Math.round(finalPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-slate-100" />

            {/* Subtotals breakdown */}
            <div className="space-y-2.5 text-xs text-slate-500 font-semibold">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-700">Rs. {Math.round(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-brand-success font-display">
                  <span>Voucher Discount</span>
                  <span className="font-bold">- Rs. {Math.round(discountAmount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                <span className="font-bold text-slate-700">
                  {deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-black text-brand-primary pt-3 border-t border-slate-100 font-display">
                <span>Grand Total</span>
                <span className="text-brand-accent text-base">Rs. {Math.round(total)}</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
