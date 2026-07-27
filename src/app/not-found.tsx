import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/ui/EmptyState";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-16 flex items-center justify-center">
        <EmptyState
          type="not-found"
          title="Oops! Page Not Found"
          description="The page you are looking for might have been moved, deleted, or is temporarily unavailable."
          actionHref="/"
          actionText="Go Back Home"
        />
      </main>
      
      <Footer />
    </div>
  );
}
