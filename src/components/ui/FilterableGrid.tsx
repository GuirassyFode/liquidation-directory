"use client";

import { useState } from "react";
import ListingCard from "@/components/ui/ListingCard";
import type { Listing } from "@/types";

interface FilterableGridProps {
  listings: Listing[];
  categories: { name: string; slug: string; icon: string; listing_count: number }[];
}

export default function FilterableGrid({ listings, categories }: FilterableGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeCategory === "all"
    ? listings
    : listings.filter((l) =>
        l.categories?.some((c) => c.slug === activeCategory)
      );

  // Sort: featured first
  const sorted = [...filtered].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const displayed = showAll ? sorted : sorted.slice(0, 12);

  return (
    <div>
      {/* Category filter tabs */}
      <div className="border-b border-border overflow-x-auto bg-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-0.5">
          <button
            onClick={() => { setActiveCategory("all"); setShowAll(false); }}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === "all"
                ? "text-hero border-hero"
                : "text-text-muted border-transparent hover:text-hero hover:border-hero/30"
            }`}
          >
            All ({listings.length})
          </button>
          {categories.filter(c => c.listing_count > 0).map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setActiveCategory(cat.slug); setShowAll(false); }}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === cat.slug
                  ? "text-hero border-hero"
                  : "text-text-muted border-transparent hover:text-hero hover:border-hero/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <p className="text-text-muted text-sm">
          {filtered.length} {filtered.length === 1 ? "warehouse" : "warehouses"}
          {activeCategory !== "all" && (
            <span> in <span className="text-hero font-medium">{categories.find(c => c.slug === activeCategory)?.name}</span></span>
          )}
        </p>
      </div>

      {/* Listings grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayed.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Show more button */}
        {!showAll && sorted.length > 12 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="bg-hero hover:bg-hero/90 text-white font-medium px-8 py-2.5 rounded-lg text-sm transition-colors"
            >
              Show all {sorted.length} listings
            </button>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-text-primary font-semibold">No listings in this category yet</p>
            <p className="text-text-muted text-sm mt-1">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
