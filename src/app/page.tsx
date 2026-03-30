import type { Metadata } from "next";
import SearchBar from "@/components/ui/SearchBar";
import FilterableGrid from "@/components/ui/FilterableGrid";
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

  const { data: allListings } = await supabase
    .from("listings")
    .select("*, listing_categories(categories(*))")
    .order("name");

  const listings = (allListings || []).map((listing: any) => ({
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
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-hero py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Find liquidation warehouses near you
              </h1>
              <p className="text-white/70 text-sm max-w-lg">
                Every pallet seller, bin store, and liquidation warehouse
                across the US &mdash; in one place. Free.
              </p>
            </div>
            <div className="w-full lg:w-[420px] shrink-0">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs + Filterable listing grid */}
      <FilterableGrid listings={listings} categories={cats} />
    </div>
  );
}
