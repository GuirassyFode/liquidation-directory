"use client";

import Link from "next/link";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
  const categoryColors: Record<string, string> = {
    "exercise-equipment": "text-teal bg-teal/10",
    "electronics": "text-purple bg-purple/10",
    "appliances": "text-coral bg-coral/10",
    "furniture": "text-gold bg-gold/10",
    "clothing-apparel": "text-hero bg-hero/10",
    "tools-hardware": "text-coral bg-coral/10",
    "home-goods": "text-teal bg-teal/10",
    "automotive": "text-gold bg-gold/10",
    "toys-games": "text-purple bg-purple/10",
    "mixed-pallets": "text-hero bg-hero/10",
  };

  const firstCat = listing.categories?.[0];
  const accentColor = firstCat ? (categoryColors[firstCat.slug] || "text-hero bg-hero/10") : "text-hero bg-hero/10";

  return (
    <Link href={`/listing/${listing.slug}`} className="group block">
      <div className="bg-white rounded-lg border border-border overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-gray-300 h-full flex flex-col">
        {/* Image area */}
        <div className="relative h-40 bg-section flex items-center justify-center">
          {listing.photos && listing.photos.length > 0 ? (
            <img
              src={listing.photos[0]}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <span className="text-5xl block mb-1 opacity-30">
                {firstCat?.icon || "\u{1F4E6}"}
              </span>
            </div>
          )}
          {listing.featured && (
            <span className="absolute top-2 right-2 bg-hero text-white text-[10px] font-bold px-2 py-1 rounded">
              FEATURED
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Category badge */}
          {firstCat && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit mb-2 ${accentColor}`}>
              {firstCat.name}
            </span>
          )}

          <h3 className="text-sm font-bold text-text-primary group-hover:text-hero transition-colors leading-snug mb-1">
            {listing.name}
          </h3>
          <p className="text-text-muted text-xs mb-2">
            {listing.city}, {listing.state} {listing.zip}
          </p>

          {/* Description snippet */}
          {listing.description && !compact && (
            <p className="text-text-muted text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
              {listing.description}
            </p>
          )}

          {/* Bottom info bar */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
            <div className="flex gap-1.5">
              {listing.categories?.slice(0, 2).map((cat) => (
                <span
                  key={cat.id}
                  className="text-[10px] text-text-muted bg-section px-1.5 py-0.5 rounded"
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <span className="text-hero text-xs font-medium group-hover:translate-x-0.5 transition-transform">
              View &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
