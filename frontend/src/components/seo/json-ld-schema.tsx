import React from "react";

interface ProductJsonLdProps {
  name: string;
  description: string;
  images: string[];
  price: number;
  currency?: string;
  sku: string;
  inStock: boolean;
  ratingValue?: number;
  reviewCount?: number;
}

export function ProductJsonLd({
  name,
  description,
  images,
  price,
  currency = "VND",
  sku,
  inStock,
  ratingValue = 5.0,
  reviewCount = 12,
}: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    image: images,
    description,
    sku,
    offers: {
      "@type": "Offer",
      url: typeof window !== "undefined" ? window.location.href : "",
      priceCurrency: currency,
      price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
