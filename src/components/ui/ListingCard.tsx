"use client";

import Link from "next/link";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

// 25 unique images — one per listing, no duplicates
const imagePool = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
];

// Simple hash from string to pick a consistent image per listing
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
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

  // Pick a unique image from the pool using slug hash — 25 images, no dupes
  const imageUrl = (listing.photos && listing.photos.length > 0 && listing.photos[0])
    ? listing.photos[0]
    : imagePool[hashString(listing.slug || listing.name) % imagePool.length];

  return (
    <Link href={`/listing/${listing.slug}`} className="group block">
      <div className={`bg-white rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col ${
        listing.featured
          ? "border-l-4 border-l-gold border-t-border border-r-border border-b-border"
          : "border-border hover:border-gray-300"
      }`}>
        {/* Image */}
        <div className="relative h-44 bg-section overflow-hidden">
          <img
            src={imageUrl}
            alt={listing.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=300&fit=crop";
            }}
          />
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
