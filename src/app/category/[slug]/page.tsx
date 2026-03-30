import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ListingCard from "@/components/ui/ListingCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase.from("categories").select("name").eq("slug", slug).single();
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} Liquidation Lots`,
    description: `Find the best ${category.name.toLowerCase()} liquidation warehouses and pallet sellers across the US.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase.from("categories").select("*").eq("slug", slug).single();
  if (!category) notFound();

  // Get listings in this category via junction table
  const { data: junctions } = await supabase
    .from("listing_categories")
    .select("listing_id")
    .eq("category_id", category.id);

  const listingIds = (junctions || []).map((j: any) => j.listing_id);

  let listings: any[] = [];
  if (listingIds.length > 0) {
    const { data: rawListings } = await supabase
      .from("listings")
      .select("*, listing_categories(categories(*))")
      .in("id", listingIds)
      .order("featured", { ascending: false })
      .order("name");

    listings = (rawListings || []).map((l: any) => ({
      ...l,
      categories: l.listing_categories?.map((lc: any) => lc.categories) || [],
      listing_categories: undefined,
    }));
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-mint transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8 bg-card rounded-xl p-8 border border-white/5 text-center">
          <span className="text-5xl block mb-3">{category.icon}</span>
          <h1 className="text-3xl font-bold text-white">{category.name}</h1>
          {category.description && (
            <p className="text-text-muted mt-2 max-w-lg mx-auto">{category.description}</p>
          )}
          <p className="text-mint font-semibold mt-3">
            {listings.length} listing{listings.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Listings Grid */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-12 text-center">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-white text-lg font-semibold mb-2">No listings yet</p>
            <p className="text-text-muted">Be the first to list your {category.name.toLowerCase()} business!</p>
          </div>
        )}
      </div>
    </div>
  );
}
