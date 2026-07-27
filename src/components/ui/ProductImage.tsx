"use client";
 
import React, { useState } from "react";
import Image from "next/image";
 
interface ProductImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  loading?: "lazy" | "eager";
}
 
const DEFAULT_FALLBACK = "/images/products/placeholder.svg";
 
type ImageSourceValue = string | Blob | undefined | null;
 
const normalizeImageSrc = (value: ImageSourceValue, fallback: string) => {
  if (typeof value !== "string") {
    return fallback;
  }
 
  const trimmed = value.trim();
  if (!trimmed) {
    return fallback;
  }
 
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }
 
  return `/images/products/${trimmed.replace(/^products\//i, "")}`;
};
 
export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = "",
  containerClassName = "",
  loading = "lazy",
}) => {
  const resolvedFallback = normalizeImageSrc(fallbackSrc, DEFAULT_FALLBACK);
  const [prevSrc, setPrevSrc] = useState(src);
  const [imageSrc, setImageSrc] = useState<string>(() => normalizeImageSrc(src, resolvedFallback));
  const [hasErrored, setHasErrored] = useState(false);
 
  // Synchronize state during render (complying with ESLint rules)
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImageSrc(normalizeImageSrc(src, resolvedFallback));
    setHasErrored(false);
  }
 
  const handleError = () => {
    if (!hasErrored && imageSrc !== resolvedFallback) {
      setImageSrc(resolvedFallback);
      setHasErrored(true);
    }
  };
 
  return (
    <Image
      src={imageSrc}
      alt={alt || "Product image"}
      onError={handleError}
      className={className}
      unoptimized
      width={400}
      height={400}
      loading={loading}
    />
  );
};
 
export default ProductImage;
