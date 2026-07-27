import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "MianMart - Premium Grocery Delivery in Mian Channu",
  description: "Fresh groceries delivered directly to your doorstep across Mian Channu in 30-45 minutes. Shop fresh fruits, vegetables, dairy, bakery, snacks, and daily essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#fafaf8] text-[#1f2937] font-sans pb-16 md:pb-0">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <CartDrawer />
              <MobileBottomNav />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
