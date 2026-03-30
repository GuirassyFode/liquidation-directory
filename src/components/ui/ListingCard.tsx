"use client";

import Link from "next/link";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.slug}`} className="group block">
      <div className="bg-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-mint/5 hover:scale-[1.02]">
        {/* Photo */}
        <div className="relative h-48 bg-gradient-to-br from-dark to-card flex items-center justify-center">
          {listing.photos.length > 0 ? (
            <img
              src={listing.photos[0]}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl opacity-50">📦</span>
          )}
          {listing.featured && (
            <span className="absolute top-3 right-3 bg-gold text-dark text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white group-hover:text-mint transition-colors truncate">
            {listing.name}
          </h3>
          <p className="text-text-muted text-sm mt-1">
            {listing.city}, {listing.state}
          </p>
          {listing.categories && listing.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {listing.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="bg-mint/10 text-mint text-xs px-2 py-0.5 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
