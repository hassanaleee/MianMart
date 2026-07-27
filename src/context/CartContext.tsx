"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoCode] = useState<string>("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("mianmart_cart");
    const storedPromo = localStorage.getItem("mianmart_promo");
    
    // Defer state updates asynchronously to avoid synchronous cascading renders and satisfy ESLint rules
    const timer = setTimeout(() => {
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (e) {
          console.error("Failed to parse cart items", e);
        }
      }
      if (storedPromo) {
        setAppliedPromo(storedPromo);
      }
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage when cartItems changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mianmart_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Save to localStorage when appliedPromo changes
  useEffect(() => {
    if (isLoaded) {
      if (appliedPromo) {
        localStorage.setItem("mianmart_promo", appliedPromo);
      } else {
        localStorage.removeItem("mianmart_promo");
      }
    }
  }, [appliedPromo, isLoaded]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code: string): boolean => {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === "WELCOME10" || normalizedCode === "MIANMART") {
      setAppliedPromo(normalizedCode);
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal before discounts
  const subtotal = cartItems.reduce((acc, item) => {
    const discountedPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
    return acc + discountedPrice * item.quantity;
  }, 0);

  // Delivery fee logic: Free delivery over PKR 1500, otherwise PKR 99
  const deliveryFee = cartCount === 0 ? 0 : subtotal >= 1500 ? 0 : 99;

  // Promo code discount: 10% off the subtotal
  const discountAmount = appliedPromo ? subtotal * 0.1 : 0;

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        promoCode,
        appliedPromo,
        applyPromo,
        removePromo,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
