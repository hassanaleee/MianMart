import React, { Suspense } from "react";
import ProductsClient from "./ProductsClient";

// Loading Skeleton Fallback
function CatalogSkeleton() {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* Skeleton Header Banner */}
      <div className="w-full bg-emerald-600/30 h-10 animate-pulse" />
      
      {/* Skeleton Navbar */}
      <div className="w-full bg-white border-b border-slate-100 py-5 px-8 flex items-center justify-between gap-6 shadow-soft">
        <div className="w-28 h-8 bg-slate-100 rounded-lg animate-pulse" />
        <div className="flex-1 max-w-xl h-10 bg-slate-100 rounded-xl animate-pulse hidden md:block" />
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
          <div className="w-24 h-10 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="w-48 h-8 bg-slate-100 rounded-xl animate-pulse" />
            <div className="w-32 h-4 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="w-28 h-9 bg-slate-100 rounded-xl animate-pulse" />
            <div className="w-36 h-9 bg-slate-100 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="flex gap-8 items-start">
          {/* Skeleton Sidebar */}
          <div className="w-64 bg-white border border-slate-100 rounded-3xl p-6 space-y-6 hidden lg:block shrink-0 shadow-soft">
            <div className="w-full h-6 bg-slate-100 rounded animate-pulse" />
            <div className="space-y-3 pt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3/4 h-5 bg-slate-100 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Skeleton Grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 shadow-soft">
                <div className="w-full aspect-square bg-slate-100 rounded-xl animate-pulse" />
                <div className="space-y-2 pt-2 flex-1">
                  <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse" />
                  <div className="h-5 bg-slate-100 rounded w-3/4 animate-pulse" />
                  <div className="h-3.5 bg-slate-100 rounded w-1/2 animate-pulse" />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="h-5 bg-slate-100 rounded w-1/4 animate-pulse" />
                  <div className="h-8 bg-slate-100 rounded-xl w-14 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <ProductsClient />
    </Suspense>
  );
}
