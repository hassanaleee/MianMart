import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import Categories from "@/components/home/Categories";
import TodaysDeals from "@/components/home/TodaysDeals";
import PopularProducts from "@/components/home/PopularProducts";
import FreshArrivals from "@/components/home/FreshArrivals";
import PopularBrands from "@/components/home/PopularBrands";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DownloadApp from "@/components/home/DownloadApp";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex-1 pb-10">
        {/* 1. Hero banner with Express delivery info and search */}
        <HeroBanner />

        {/* 2. visual categories grid/carousel */}
        <Categories />

        {/* 3. Today's Deals (Active discounts) */}
        <TodaysDeals />

        {/* 4. Top Picks (Popular products) */}
        <PopularProducts />

        {/* 5. Fresh Arrivals (Fruits & Vegetables focus) */}
        <FreshArrivals />

        {/* 6. Popular Brands (Shan, Tapal, Nestlé etc.) */}
        <PopularBrands />

        {/* 7. Why Shop With Us (COD, 30-45 mins delivery USPs) */}
        <WhyChooseUs />

        {/* 8. Mobile App announcement */}
        <DownloadApp />
      </main>

      <Footer />
    </>
  );
}
