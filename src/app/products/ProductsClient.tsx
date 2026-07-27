"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import ProductCard from "@/components/ui/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/ui/EmptyState";
import {
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ProductsClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const products: Product[] = productsData as Product[];

  // States
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [showDealsOnly, setShowDealsOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Snacks", "Beverages", "Frozen Food", "Household", "Personal Care", "Baby Care"];
  
  const brands = [
    "All",
    "Olper's",
    "Nestlé",
    "Nestlé Milkpak",
    "Shan",
    "National",
    "Tapal",
    "Lipton",
    "K&N's",
    "Peek Freans",
    "Surf Excel",
    "Safeguard"
  ];

  const q = searchParams.get("q") || "";
  const cat = searchParams.get("category") || "All";
  const brand = searchParams.get("brand") || "All";
  const filter = searchParams.get("filter") || "";

  // Track searchParams to synchronize during render (satisfying ESLint rules)
  const [prevParams, setPrevParams] = useState({ q, cat, brand, filter });
  if (q !== prevParams.q || cat !== prevParams.cat || brand !== prevParams.brand || filter !== prevParams.filter) {
    setPrevParams({ q, cat, brand, filter });
    setSearchQuery(q);
    setSelectedCategory(cat);
    setSelectedBrand(brand);
    setShowDealsOnly(filter === "deals");
  }

  // Apply filters and sorting
  useEffect(() => {
    // Defer state update to avoid synchronous cascading renders
    const filterStartTimer = setTimeout(() => {
      setIsFiltering(true);
    }, 0);
    
    // Simulate minor loading skeleton for visual polish
    const timer = setTimeout(() => {
      let result = [...products];

      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase().trim();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
      }

      // 2. Category Filter
      if (selectedCategory !== "All") {
        result = result.filter((p) => p.category === selectedCategory);
      }

      // 3. Brand Filter
      if (selectedBrand !== "All") {
        result = result.filter((p) => p.brand === selectedBrand);
      }

      // 4. Price Bucket Filter
      if (priceRange !== "All") {
        if (priceRange === "under200") {
          result = result.filter((p) => p.price <= 200);
        } else if (priceRange === "200to500") {
          result = result.filter((p) => p.price > 200 && p.price <= 500);
        } else if (priceRange === "500to1000") {
          result = result.filter((p) => p.price > 500 && p.price <= 1000);
        } else if (priceRange === "over1000") {
          result = result.filter((p) => p.price > 1000);
        }
      }

      // 5. Deals Only
      if (showDealsOnly) {
        result = result.filter((p) => p.discount > 0);
      }

      // 6. Sorting
      if (sortBy === "priceAsc") {
        result.sort((a, b) => {
          const priceA = a.price * (1 - (a.discount || 0) / 100);
          const priceB = b.price * (1 - (b.discount || 0) / 100);
          return priceA - priceB;
        });
      } else if (sortBy === "priceDesc") {
        result.sort((a, b) => {
          const priceA = a.price * (1 - (a.discount || 0) / 100);
          const priceB = b.price * (1 - (b.discount || 0) / 100);
          return priceB - priceA;
        });
      } else if (sortBy === "discount") {
        result.sort((a, b) => b.discount - a.discount);
      } else if (sortBy === "rating") {
        result.sort((a, b) => b.rating - a.rating);
      }

      setFilteredProducts(result);
      setIsFiltering(false);
    }, 450);

    return () => {
      clearTimeout(filterStartTimer);
      clearTimeout(timer);
    };
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, showDealsOnly, sortBy, products]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange("All");
    setShowDealsOnly(false);
    setSortBy("default");
    setSearchQuery("");
    router.push("/products");
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex-1 select-none">
        <div className="rounded-[32px] border border-slate-200 bg-white/80 p-5 md:p-7 shadow-soft mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] font-display">MianMart Catalog</span>
              <h1 className="font-display text-3xl font-extrabold text-brand-primary tracking-tight mt-0.5">
                {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== "All" ? selectedCategory : "Store Catalog"}
              </h1>
              <p className="text-slate-500 text-xs font-semibold mt-1">Showing {filteredProducts.length} premium products in Mian Channu</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button onClick={() => setShowDealsOnly(!showDealsOnly)} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${showDealsOnly ? "bg-brand-accent/15 border-brand-accent text-brand-accent-hover font-black" : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"}`}>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Offers & Deals</span>
              </button>

              <div className="relative bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-slate-600 hover:border-slate-350 select-none">
                <span>Sort: </span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border-none outline-none text-brand-primary cursor-pointer font-black">
                  <option value="default">Relevance</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {(selectedCategory !== "All" || selectedBrand !== "All" || priceRange !== "All" || showDealsOnly || searchQuery) && (
                <button onClick={handleResetFilters} className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 hover:underline text-xs font-bold py-2 px-1 transition-all cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-64 bg-white/80 border border-slate-200 rounded-[24px] p-6 space-y-6 shrink-0 hidden lg:block shadow-soft">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <SlidersHorizontal className="w-4.5 h-4.5 text-brand-primary" />
              <span className="font-display font-black text-brand-primary text-base">Filter Panel</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.26em] font-display">Categories</h4>
              <div className="flex flex-col gap-1 text-xs font-bold text-slate-600">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); router.push(`/products?category=${encodeURIComponent(cat)}`); }} className={`text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${selectedCategory === cat ? "bg-brand-primary-light text-brand-primary font-black shadow-sm" : "hover:bg-slate-50 hover:text-slate-800"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.26em] font-display">Brands</h4>
              <div className="relative">
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:bg-white focus:border-brand-primary cursor-pointer">
                  {brands.map((b) => <option key={b} value={b}>{b === "All" ? "All Brands" : b}</option>)}
                </select>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.26em] font-display">Price range</h4>
              <div className="flex flex-col gap-1 font-bold text-slate-600 text-xs">
                {[{ label: "All Prices", value: "All" }, { label: "Under PKR 200", value: "under200" }, { label: "PKR 200 - PKR 500", value: "200to500" }, { label: "PKR 500 - PKR 1000", value: "500to1000" }, { label: "Over PKR 1000", value: "over1000" }].map((item) => (
                  <button key={item.value} onClick={() => setPriceRange(item.value)} className={`text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${priceRange === item.value ? "bg-brand-primary-light text-brand-primary font-black" : "hover:bg-slate-50"}`}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="w-full overflow-x-auto pb-2 flex gap-2 lg:hidden no-scrollbar">
            {categories.map((cat) => (
              <button key={cat} onClick={() => { setSelectedCategory(cat); router.push(`/products?category=${encodeURIComponent(cat)}`); }} className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${selectedCategory === cat ? "bg-brand-primary border-brand-primary text-white font-black" : "bg-white border-slate-200 text-slate-600"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 w-full min-w-0">
            {isFiltering ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-[24px] p-4 flex flex-col gap-4 shadow-soft animate-pulse">
                    <div className="w-full aspect-square bg-slate-100 rounded-xl" />
                    <div className="space-y-2 flex-1 pt-2">
                      <div className="h-2 bg-slate-100 rounded w-1/4" />
                      <div className="h-4 bg-slate-100 rounded w-3/4" />
                      <div className="h-3.5 bg-slate-100 rounded w-1/2" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="h-4 bg-slate-100 rounded w-1/3" />
                      <div className="h-8 bg-slate-100 rounded-xl w-14" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState type="search" title="No products found" description={`We couldn't find matches for "${searchQuery}". Try selecting alternative filters or search terms.`} onActionClick={handleResetFilters} actionText="Reset All Filters" suggestedSearches />
            ) : (
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductsClient;
