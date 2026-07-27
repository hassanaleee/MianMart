"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, History, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SearchBarProps {
  isMobile?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const q = searchParams.get("q") || "";
  const [prevQ, setPrevQ] = useState(q);
  const [searchQuery, setSearchQuery] = useState(q);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const popularSearches = ["Milk", "Eggs", "Bread", "Rice", "Cooking Oil"];

  // Synchronize state during render (complying with ESLint rules)
  if (q !== prevQ) {
    setPrevQ(q);
    setSearchQuery(q);
  }

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("mianmart_recent_searches");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const timer = setTimeout(() => {
          setRecentSearches(parsed);
        }, 0);
        return () => clearTimeout(timer);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(searchQuery);
  };

  const triggerSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    // Save to recent searches
    const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("mianmart_recent_searches", JSON.stringify(updated));

    setIsSearchFocused(false);
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSuggestionClick = (term: string) => {
    setSearchQuery(term);
    triggerSearch(term);
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem("mianmart_recent_searches");
  };

  const handleInputClear = () => {
    setSearchQuery("");
    router.push("/products");
  };

  return (
    <div ref={searchRef} className={isMobile ? "relative flex-1" : "relative flex-1 max-w-lg mx-4"}>
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder={isMobile ? "Search groceries..." : "Search groceries (e.g. Milk, Eggs, Bread...)"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200/60 rounded-2xl text-xs font-semibold focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        {searchQuery && (
          <button
            type="button"
            onClick={handleInputClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-450 hover:text-red-500 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown with Framer Motion */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-150 rounded-2xl shadow-premium p-5 z-50 overflow-hidden"
          >
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><History className="w-3.5 h-3.5" /> Recent Searches</span>
                  <button type="button" onClick={clearRecentSearches} className="hover:text-red-500 transition-colors">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(term)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-brand-primary-light hover:text-brand-primary rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-[10px] font-black text-slate-400 mb-2 flex items-center gap-1 uppercase tracking-widest">
                <TrendingUp className="w-3.5 h-3.5" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(term)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-brand-primary-light hover:text-brand-primary rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
