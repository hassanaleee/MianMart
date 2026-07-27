"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/ui/EmptyState";
import {
  Trash2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Clock,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

export default function CartPage() {
  const router = useRouter();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    appliedPromo,
    applyPromo,
    removePromo
  } = useCart();
  
  const { toast } = useToast();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (!promoInput.trim()) return;

    const success = applyPromo(promoInput);
    if (success) {
      toast("Voucher code applied! Saved 10% off items", "success");
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try 'WELCOME10' or 'MIANMART'");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex-1 select-none">
        <div className="space-y-1 mb-8">
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] block font-display">Shopping Cart</span>
          <h1 className="font-display text-3xl font-extrabold text-brand-primary tracking-tight">Checkout Summary</h1>
        </div>

        {cartItems.length === 0 ? (
          /* Handcrafted Illustrated Empty State */
          <EmptyState
            type="cart"
            title="Your shopping cart is empty"
            description="Add products to your cart to see them here, edit quantities, and proceed to order placement."
            actionHref="/products"
            actionText="Start Shopping"
            suggestedSearches
          />
        ) : (
          /* Cart items and details lists */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left list container */}
            <div className="lg:col-span-2 space-y-4 animate-in fade-in duration-200">
              <div className="bg-white/90 border border-slate-200 rounded-[24px] p-5 md:p-6 shadow-soft space-y-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.28em] block border-b border-slate-100 pb-3 font-display">Cart Items ({cartItems.length})</span>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => {
                    const finalPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
                    return (
                      <div
                        key={item.product.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        {/* Image details */}
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 relative rounded-2xl overflow-hidden border border-slate-100 shrink-0 bg-slate-50 p-1 flex items-center justify-center">
                            <ProductImage
                              src={item.product.image}
                              alt={item.product.name}
                              fallbackSrc="/images/products/placeholder.svg"
                              className="object-cover max-w-full max-h-full"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[9px] font-black text-brand-accent tracking-widest uppercase block font-display">
                              {item.product.brand}
                            </span>
                            <Link href={`/products/${item.product.id}`}>
                              <h4 className="text-sm sm:text-base font-bold text-brand-primary font-display hover:text-brand-accent transition-colors leading-tight">
                                {item.product.name}
                              </h4>
                            </Link>
                            <p className="text-xs font-semibold text-slate-400">
                              Size: {item.product.weight}
                            </p>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-slate-50 sm:border-t-0 pt-3 sm:pt-0">
                          
                          <div className="flex flex-col sm:text-right">
                            <span className="text-sm font-extrabold text-brand-primary font-display">
                              Rs. {Math.round(finalPrice)}
                            </span>
                            {item.product.discount > 0 && (
                              <span className="text-[10px] text-slate-450 line-through">
                                Rs. {item.product.price}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-soft">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 text-slate-500 hover:bg-slate-50 font-black cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold text-brand-primary">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 text-slate-500 hover:bg-slate-50 font-black cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-black text-brand-primary min-w-[70px] text-right hidden xs:inline font-display">
                            Rs. {Math.round(finalPrice * item.quantity)}
                          </span>

                          <button
                            onClick={() => {
                              removeFromCart(item.product.id);
                              toast(`Removed ${item.product.name} from cart`, "info");
                            }}
                            className="text-slate-350 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* USP grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary-light flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="leading-tight">
                    <h5 className="font-display font-bold text-brand-primary text-xs">Express Delivery</h5>
                    <p className="text-[10px] text-slate-450 font-semibold mt-0.5">30-45 mins inside Mian Channu.</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-brand-success-light flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-brand-success" />
                  </div>
                  <div className="leading-tight">
                    <h5 className="font-display font-bold text-slate-700 text-xs">Checked Fresh</h5>
                    <p className="text-[10px] text-slate-450 font-semibold mt-0.5">Every grocery checked manually.</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent-light flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-accent-hover" />
                  </div>
                  <div className="leading-tight">
                    <h5 className="font-display font-bold text-slate-700 text-xs">Cash on Delivery</h5>
                    <p className="text-[10px] text-slate-450 font-semibold mt-0.5">Cash payments accepted at door.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right receipt panel */}
            <div className="space-y-6">
              <div className="bg-white/90 border border-slate-200 rounded-[24px] p-6 shadow-soft space-y-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.28em] block border-b border-slate-100 pb-3 font-display">Order Summary</span>

                {/* Promo Code Form */}
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Voucher Code (e.g. MIANMART)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:border-brand-primary outline-none transition-all"
                      />
                      {promoError && (
                        <span className="absolute left-0 -bottom-4.5 text-[9px] text-red-500 flex items-center gap-0.5 font-bold">
                          <AlertCircle className="w-3 h-3" /> {promoError}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-4.5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100/50 px-3.5 py-3 rounded-xl text-xs font-bold text-emerald-800 font-display">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      <span>Voucher: <span className="font-bold">{appliedPromo}</span></span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-emerald-600 hover:text-red-500 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Subtotals breakdown */}
                <div className="space-y-3.5 text-xs text-slate-500 font-semibold pt-2">
                  <div className="flex items-center justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-700">Rs. {Math.round(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-brand-success font-display">
                      <span>Voucher Discount (10%)</span>
                      <span className="font-bold">- Rs. {Math.round(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-slate-700">
                      {deliveryFee === 0 ? (
                        <span className="text-brand-success font-black uppercase text-[10px]">Free Delivery</span>
                      ) : (
                        `Rs. ${deliveryFee}`
                      )}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="bg-brand-primary-light border border-slate-150 p-3.5 rounded-xl text-[10.5px] text-slate-500 font-semibold leading-relaxed">
                      💡 Get <span className="text-brand-primary font-black uppercase text-[9px]">Free Delivery</span> by shopping for <span className="text-brand-primary font-extrabold">Rs. {Math.max(0, 1500 - subtotal)}</span> more!
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm font-black text-brand-primary pt-4 border-t border-slate-100 font-display">
                    <span>Grand Total</span>
                    <span className="text-brand-accent text-base">Rs. {Math.round(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 group cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
