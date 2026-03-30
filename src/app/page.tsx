import type { Metadata } from "next";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCard from "@/components/ui/CategoryCard";
import ListingCard from "@/components/ui/ListingCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "LiquidationLots.com - Find Liquidation Lots Near You",
  description: "Browse the largest directory of liquidation stores, pallet sellers, and wholesale liquidation lots across the United States.",
};

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch categories with listing counts
  const { data: categories } = await supabase
    .from("categories")
    .select("*, listing_categories(count)")
    .order("name");

  // Fetch featured listings with their categories
  const { data: featuredListings } = await supabase
    .from("listings")
    .select("*, listing_categories(categories(*))")
    .eq("featured", true)
    .limit(6);

  // Transform listings to include categories array
  const listings = (featuredListings || []).map((listing: any) => ({
    ...listing,
    categories: listing.listing_categories?.map((lc: any) => lc.categories) || [],
    listing_categories: undefined,
  }));

  // Transform categories with count
  const cats = (categories || []).map((cat: any) => ({
    ...cat,
    listing_count: cat.listing_categories?.[0]?.count || 0,
    listing_categories: undefined,
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-section to-dark py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find <span className="text-mint">Liquidation Lots</span> Near You
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">
            Browse the largest directory of liquidation stores, pallet sellers,
            and wholesale liquidation lots across the United States.
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section id="categories" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Browse by Category
          </h2>
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

      {/* Featured Listings */}
      <section className="py-16 px-4 bg-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            <span className="text-gold">⭐</span> Featured Listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="bg-card rounded-xl p-8 border border-white/5">
              <p className="text-4xl font-bold text-mint mb-2">25+</p>
              <p className="text-text-muted">Liquidation Stores</p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-white/5">
              <p className="text-4xl font-bold text-gold mb-2">20+</p>
              <p className="text-text-muted">Cities Covered</p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-white/5">
              <p className="text-4xl font-bold text-coral mb-2">10</p>
              <p className="text-text-muted">Categories</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
