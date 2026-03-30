import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCard from "@/components/ui/CategoryCard";
import ListingCard from "@/components/ui/ListingCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Liquidation Lots - Find Warehouses & Pallet Sellers Near You",
  description: "We mapped out every liquidation warehouse, bin store, and pallet seller we could find. Search by city, browse by category, and start reselling smarter.",
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*, listing_categories(count)")
    .order("name");

  const { data: featuredListings } = await supabase
    .from("listings")
    .select("*, listing_categories(categories(*))")
    .eq("featured", true)
    .limit(6);

  const { data: allListings } = await supabase
    .from("listings")
    .select("*, listing_categories(categories(*))")
    .order("name");

  const transformListing = (listing: any) => ({
    ...listing,
    categories: listing.listing_categories?.map((lc: any) => lc.categories) || [],
    listing_categories: undefined,
  });

  const featured = (featuredListings || []).map(transformListing);
  const all = (allListings || []).map(transformListing);

  const cats = (categories || []).map((cat: any) => ({
    ...cat,
    listing_count: cat.listing_categories?.[0]?.count || 0,
    listing_categories: undefined,
  }));

  // Group listings by category for carousels
  const electronicListings = all.filter((l: any) => l.categories.some((c: any) => c.slug === "electronics"));
  const mixedListings = all.filter((l: any) => l.categories.some((c: any) => c.slug === "mixed-pallets"));
  const toolListings = all.filter((l: any) => l.categories.some((c: any) => c.slug === "tools-hardware"));

  return (
    <div className="bg-white">
      {/* Hero - B-Stock blue style */}
      <section className="bg-hero py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Find liquidation warehouses near you
              </h1>
              <p className="text-white/70 text-sm max-w-lg">
                We tracked down every pallet seller, bin store, and liquidation warehouse
                across the US. Search them all in one place &mdash; free.
              </p>
            </div>
            <div className="w-full lg:w-[420px] shrink-0">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Filter tabs - like B-Stock nav */}
      <section className="bg-white border-b border-border overflow-x-auto shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-0.5">
          <Link href="/search" className="px-4 py-3 text-sm font-medium text-text-muted hover:text-hero hover:bg-hero/5 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-hero">
            All Listings
          </Link>
          {cats.slice(0, 7).map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-3 text-sm font-medium text-text-muted hover:text-hero hover:bg-hero/5 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-hero"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/#categories" className="px-4 py-3 text-sm font-medium text-text-muted hover:text-hero hover:bg-hero/5 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-hero">
            All Categories &darr;
          </Link>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                Featured Warehouses
              </h2>
              <p className="text-text-muted text-xs mt-0.5">
                Verified spots with solid reputations &middot; {featured.length} listings
              </p>
            </div>
            <Link href="/search" className="text-hero hover:text-hero/80 text-xs font-medium">
              View More
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {featured.map((listing: any) => (
              <div key={listing.id} className="snap-start shrink-0 w-[260px]">
                <ListingCard listing={listing} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electronics carousel */}
      {electronicListings.length > 0 && (
        <section className="py-8 px-4 bg-section">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  Electronics &amp; Tech
                </h2>
                <p className="text-text-muted text-xs mt-0.5">
                  TVs, phones, computers, and more &middot; {electronicListings.length} listings
                </p>
              </div>
              <Link href="/category/electronics" className="text-hero hover:text-hero/80 text-xs font-medium">
                View More
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {electronicListings.map((listing: any) => (
                <div key={listing.id} className="snap-start shrink-0 w-[260px]">
                  <ListingCard listing={listing} compact />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mixed Pallets carousel */}
      {mixedListings.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  Mixed Pallets &amp; General Merchandise
                </h2>
                <p className="text-text-muted text-xs mt-0.5">
                  Variety lots from major retailers &middot; {mixedListings.length} listings
                </p>
              </div>
              <Link href="/category/mixed-pallets" className="text-hero hover:text-hero/80 text-xs font-medium">
                View More
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {mixedListings.map((listing: any) => (
                <div key={listing.id} className="snap-start shrink-0 w-[260px]">
                  <ListingCard listing={listing} compact />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools carousel */}
      {toolListings.length > 0 && (
        <section className="py-8 px-4 bg-section">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  Tools &amp; Hardware
                </h2>
                <p className="text-text-muted text-xs mt-0.5">
                  Power tools, hand tools, hardware &middot; {toolListings.length} listings
                </p>
              </div>
              <Link href="/category/tools-hardware" className="text-hero hover:text-hero/80 text-xs font-medium">
                View More
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {toolListings.map((listing: any) => (
                <div key={listing.id} className="snap-start shrink-0 w-[260px]">
                  <ListingCard listing={listing} compact />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse all categories grid */}
      <section id="categories" className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-text-primary mb-1">
              All Categories
            </h2>
            <p className="text-text-muted text-sm">
              Browse by what you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {cats.map((cat: any) => (
              <CategoryCard
                key={cat.slug}
                name={cat.name}
                slug={cat.slug}
                icon={cat.icon}
                listingCount={cat.listing_count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="py-12 px-4 bg-section border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-text-primary mb-3">
            Why we built this
          </h2>
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            I got tired of Googling &ldquo;liquidation pallets near me&rdquo; and
            getting the same ads over and over. So I started tracking down every
            warehouse I could find. This directory is that list &mdash; cleaned up
            and searchable. Free to use, no signup.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/search" className="bg-hero hover:bg-hero/90 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              Browse all listings
            </Link>
            <Link href="/about" className="border border-border hover:border-gray-400 text-text-primary px-5 py-2.5 rounded-lg text-sm transition-colors">
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto flex justify-center gap-12 text-center">
          <div>
            <p className="text-2xl font-bold text-text-primary">25+</p>
            <p className="text-text-muted text-xs mt-1">warehouses</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">20</p>
            <p className="text-text-muted text-xs mt-1">cities</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-hero">Free</p>
            <p className="text-text-muted text-xs mt-1">always</p>
          </div>
        </div>
      </section>
    </div>
  );
}
