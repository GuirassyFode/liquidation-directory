import type { Metadata } from "next";
import SearchBar from "@/components/ui/SearchBar";
import ListingCard from "@/components/ui/ListingCard";
import { createClient } from "@/lib/supabase/server";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; state?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || "";
  return {
    title: query
      ? `Liquidation Lots: ${query}`
      : "Browse All Liquidation Lots",
    description: query
      ? `Find liquidation warehouses and pallet sellers for "${query}". Browse wholesale lots near you.`
      : "Browse all liquidation stores, pallet sellers, and wholesale lots across the United States.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const state = params.state || "";

  const supabase = await createClient();

  // Build query
  let dbQuery = supabase
    .from("listings")
    .select("*, listing_categories(categories(*))")
    .order("featured", { ascending: false })
    .order("name");

  // Text search on name, city, state, description, zip
  if (query) {
    dbQuery = dbQuery.or(
      `name.ilike.%${query}%,city.ilike.%${query}%,state.ilike.%${query}%,description.ilike.%${query}%,zip.ilike.%${query}%`
    );
  }

  // State filter
  if (state) {
    dbQuery = dbQuery.eq("state", state.toUpperCase());
  }

  const { data: rawListings } = await dbQuery;

  // Transform and filter by category if needed
  let listings = (rawListings || []).map((listing: any) => ({
    ...listing,
    categories:
      listing.listing_categories?.map((lc: any) => lc.categories) || [],
    listing_categories: undefined,
  }));

  if (category) {
    listings = listings.filter((listing: any) =>
      listing.categories.some((cat: any) => cat.slug === category)
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {query ? (
                <>
                  Results for{" "}
                  <span className="text-mint">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                "Browse All Listings"
              )}
            </h1>
            <p className="text-text-muted text-sm mt-1">
              {listings.length} listing{listings.length !== 1 ? "s" : ""} found
              {category && ` in ${category.replace("-", " ")}`}
            </p>
          </div>
        </div>

        {/* Results Grid */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-12 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-white text-lg font-semibold mb-2">
              No listings found
            </p>
            <p className="text-text-muted">
              Try a different search term or browse all categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
