import React from "react";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import ProductDetailsClient from "./ProductDetailsClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const products: Product[] = productsData as Product[];
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Filter 4 related products from the same category (excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailsClient 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}
