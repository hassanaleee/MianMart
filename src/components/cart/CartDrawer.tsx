"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { X, Trash2, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "@/components/ui/EmptyState";
import ProductImage from "@/components/ui/ProductImage";

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const { 
    cartItems, 
    isCartOpen, 
    setCartOpen, 
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
      toast("Voucher applied! Saved 10% off items", "success");
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try 'WELCOME10' or 'MIANMART'");
    }
  };

  const handleCheckoutClick = () => {
    setCartOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl overflow-hidden rounded-l-[28px] border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-display text-brand-primary">My Cart</span>
                <span className="bg-brand-primary-light text-brand-primary text-xs font-black px-2.5 py-0.5 rounded-full">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-655 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                /* Illustrated Empty state */
                <div className="h-full flex items-center justify-center">
                  <EmptyState
                    type="cart"
                    title="Your cart is empty"
                    description="Looks like you haven't added anything yet. Let's find some delicious items!"
                    actionHref="/products"
                    actionText="Browse Shop"
                    onActionClick={() => {
                      setCartOpen(false);
                      router.push("/products");
                    }}
                  />
                </div>
              ) : (
                /* Items scroll list */
                cartItems.map((item) => {
                  const finalPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
                  return (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-4 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-150/50"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 relative rounded-xl overflow-hidden border border-slate-200/50 shrink-0 bg-white p-1 flex items-center justify-center">
                        <ProductImage
                          src={item.product.image}
                          alt={item.product.name}
                          fallbackSrc="/images/products/placeholder.svg"
                          className="object-cover max-w-full max-h-full"
                        />
                      </div>

                      {/* Info details */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black text-brand-accent tracking-widest uppercase block font-display">
                          {item.product.brand}
                        </span>
                        <h4 className="text-sm font-bold text-brand-primary truncate font-display -mt-0.5 leading-tight">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400">
                          {item.product.weight}
                        </span>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-extrabold text-brand-primary">
                            Rs. {Math.round(finalPrice)}
                          </span>
                          {item.product.discount > 0 && (
                            <span className="text-[10px] text-slate-400 line-through">
                              Rs. {item.product.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => {
                            removeFromCart(item.product.id);
                            toast(`Removed ${item.product.name} from cart`, "info");
                          }}
                          className="text-slate-350 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-soft">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-50 font-black cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-bold text-brand-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-50 font-black cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer summary panel */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-[#fafaf8]/50 space-y-4">
                
                {/* Coupon Code Input */}
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Voucher Code (e.g. MIANMART)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:border-brand-primary outline-none transition-all"
                      />
                      {promoError && (
                        <span className="absolute left-0 -bottom-4 text-[9px] text-red-500 flex items-center gap-0.5 font-bold">
                          <AlertCircle className="w-3 h-3" /> {promoError}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-4.5 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100/50 px-3.5 py-3 rounded-xl text-xs font-bold text-emerald-800">
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

                <div className="h-px bg-slate-200/60 pt-2" />

                {/* Bill details */}
                <div className="space-y-2 text-xs text-slate-500 font-semibold">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-extrabold text-brand-primary">Rs. {Math.round(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600">
                      <span>Promo Savings (10%)</span>
                      <span className="font-bold">- Rs. {Math.round(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-extrabold text-brand-primary font-display">
                      {deliveryFee === 0 ? (
                        <span className="text-brand-success font-black uppercase text-[10px]">Free Delivery</span>
                      ) : (
                        `Rs. ${deliveryFee}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm font-black text-brand-primary pt-3 border-t border-slate-100 font-display">
                    <span>Total Amount</span>
                    <span className="text-brand-accent text-base">Rs. {Math.round(total)}</span>
                  </div>
                </div>

                {/* Checkout Proceed CTA */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 group cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
