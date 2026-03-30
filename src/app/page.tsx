import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCard from "@/components/ui/CategoryCard";
import ListingCard from "@/components/ui/ListingCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Liquidation Lots - Stop Overpaying for Inventory",
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

  const listings = (featuredListings || []).map((listing: any) => ({
    ...listing,
    categories: listing.listing_categories?.map((lc: any) => lc.categories) || [],
    listing_categories: undefined,
  }));

  const cats = (categories || []).map((cat: any) => ({
    ...cat,
    listing_count: cat.listing_categories?.[0]?.count || 0,
    listing_categories: undefined,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-section to-dark pt-16 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-mint text-sm font-semibold tracking-widest uppercase mb-4">
            Free directory &middot; No signup required
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Find liquidation warehouses<br className="hidden sm:block" />
            <span className="text-mint">before everyone else does.</span>
          </h1>
          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            We spent weeks tracking down every pallet seller, bin store, and liquidation
            warehouse across the US. Now you can search them all in one place.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
          <p className="text-text-muted/60 text-xs mt-4">
            Try: &ldquo;Houston&rdquo;, &ldquo;Miami&rdquo;, &ldquo;electronics&rdquo;, or just hit search to browse everything
          </p>
        </div>
      </section>

      {/* How it works - conversational */}
      <section className="py-14 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-mint tracking-widest uppercase text-center mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-3">1.</div>
              <h3 className="text-white font-bold mb-2">Search your area</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Type your city, state, or zip. We&apos;ll show you every liquidation
                spot we know about nearby.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">2.</div>
              <h3 className="text-white font-bold mb-2">Check the details</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Hours, phone numbers, what they carry, whether they&apos;re
                walk-in friendly. All the info you actually need.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">3.</div>
              <h3 className="text-white font-bold mb-2">Go get deals</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Show up, find pallets at 10-20% of retail, and flip them
                on Facebook Marketplace or eBay. That&apos;s it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-14 px-4 bg-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What are you looking for?
            </h2>
            <p className="text-text-muted">
              Pick a category to narrow things down
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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

      {/* Featured */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Worth checking out
              </h2>
              <p className="text-text-muted text-sm mt-1">
                Verified warehouses with solid reputations
              </p>
            </div>
            <Link
              href="/search"
              className="text-mint hover:text-mint/80 text-sm font-medium transition-colors hidden sm:block"
            >
              See all listings &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/search"
              className="text-mint hover:text-mint/80 text-sm font-medium"
            >
              See all listings &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof / why this exists */}
      <section className="py-14 px-4 bg-section border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why we built this
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">
            I got tired of Googling &ldquo;liquidation pallets near me&rdquo; and
            getting the same three ads over and over. So I started making a list.
            Drove to warehouses. Called phone numbers. Checked which ones were
            actually legit. This directory is that list &mdash; cleaned up and
            searchable.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            It&apos;s free to use. If you own a liquidation warehouse and want
            to be listed (or update your info), just reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-mint hover:bg-mint/90 text-dark font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Browse all listings
            </Link>
            <Link
              href="/about"
              className="border border-white/10 hover:border-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats - more casual */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-white">25+</p>
              <p className="text-text-muted text-sm mt-1">warehouses listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">20</p>
              <p className="text-text-muted text-sm mt-1">cities covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">Free</p>
              <p className="text-text-muted text-sm mt-1">no signup needed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
