"use client";

import Link from "next/link";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
  // Pick a color based on the first category
  const categoryColors: Record<string, string> = {
    "exercise-equipment": "text-teal",
    "electronics": "text-purple",
    "appliances": "text-coral",
    "furniture": "text-gold",
    "clothing-apparel": "text-mint",
    "tools-hardware": "text-coral",
    "home-goods": "text-teal",
    "automotive": "text-gold",
    "toys-games": "text-purple",
    "mixed-pallets": "text-mint",
  };

  const firstCat = listing.categories?.[0];
  const accentColor = firstCat ? (categoryColors[firstCat.slug] || "text-mint") : "text-mint";

  return (
    <Link href={`/listing/${listing.slug}`} className="group block">
      <div className="bg-card rounded-lg border border-white/5 overflow-hidden transition-all duration-200 hover:border-white/15 hover:shadow-lg hover:shadow-black/20 h-full flex flex-col">
        {/* Top section - category label + image */}
        <div className="relative">
          {/* Category label bar */}
          {firstCat && (
            <div className="bg-dark/80 px-3 py-1.5 flex items-center justify-between">
              <span className={`text-xs font-semibold ${accentColor}`}>
                {firstCat.icon} {firstCat.name}
              </span>
              {listing.featured && (
                <span className="bg-gold/20 text-gold text-[10px] font-bold px-2 py-0.5 rounded">
                  FEATURED
                </span>
              )}
            </div>
          )}

          {/* Image area */}
          <div className="h-36 bg-gradient-to-br from-section to-card flex items-center justify-center">
            {listing.photos && listing.photos.length > 0 ? (
              <img
                src={listing.photos[0]}
                alt={listing.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <span className="text-4xl block mb-1 opacity-40">
                  {firstCat?.icon || "📦"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-white group-hover:text-mint transition-colors leading-snug mb-1">
            {listing.name}
          </h3>
          <p className="text-text-muted text-xs mb-2">
            {listing.city}, {listing.state} {listing.zip}
          </p>

          {/* Description snippet */}
          {listing.description && !compact && (
            <p className="text-text-muted/70 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
              {listing.description}
            </p>
          )}

          {/* Bottom info bar */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
            <div className="flex gap-2">
              {listing.categories?.slice(0, 2).map((cat) => (
                <span
                  key={cat.id}
                  className="text-[10px] text-text-muted bg-dark px-1.5 py-0.5 rounded"
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <span className="text-mint text-xs font-medium group-hover:translate-x-0.5 transition-transform">
              View &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
