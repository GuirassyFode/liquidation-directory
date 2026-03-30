import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPhone } from "@/lib/utils";
import ListingCard from "@/components/ui/ListingCard";

interface ListingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: listing } = await supabase.from("listings").select("name, city, state, description").eq("slug", slug).single();
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `${listing.name} - ${listing.city}, ${listing.state}`,
    description: listing.description || `Find liquidation deals at ${listing.name} in ${listing.city}, ${listing.state}.`,
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: rawListing } = await supabase.from("listings").select("*, listing_categories(categories(*))").eq("slug", slug).single();
  if (!rawListing) notFound();

  const listing = { ...rawListing, categories: rawListing.listing_categories?.map((lc: any) => lc.categories) || [] };
  const hours = listing.hours as Record<string, string> | null;
  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Similar listings
  const categorySlugs = listing.categories.map((c: any) => c.slug);
  const { data: similar } = await supabase.from("listings").select("*, listing_categories(categories(*))").neq("slug", slug).limit(6);
  const similarListings = (similar || []).map((l: any) => ({ ...l, categories: l.listing_categories?.map((lc: any) => lc.categories) || [] })).filter((l: any) => l.categories.some((c: any) => categorySlugs.includes(c.slug))).slice(0, 3);

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-mint transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/search" className="hover:text-mint transition-colors">Listings</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{listing.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-card rounded-xl p-6 border border-white/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{listing.name}</h1>
                  <p className="text-text-muted">📍 {listing.address}, {listing.city}, {listing.state} {listing.zip}</p>
                </div>
                {listing.featured && (
                  <span className="bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">⭐ Featured</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.categories.map((cat: any) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`} className="bg-mint/10 text-mint text-xs font-medium px-3 py-1 rounded-full hover:bg-mint/20 transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
              {listing.description && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-white mb-2">About</h2>
                  <p className="text-text-body leading-relaxed">{listing.description}</p>
                </div>
              )}
            </div>

            {/* Hours */}
            {hours && (
              <div className="bg-card rounded-xl p-6 border border-white/5">
                <h2 className="text-lg font-semibold text-white mb-4">🕐 Business Hours</h2>
                <div className="space-y-2">
                  {dayOrder.map((day) => (
                    <div key={day} className="flex justify-between text-sm py-1 border-b border-white/5 last:border-0">
                      <span className="text-text-muted font-medium">{day}</span>
                      <span className="text-text-body">{hours[day] || "Closed"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-card rounded-xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-4">📍 Location</h2>
              <div className="h-48 bg-dark rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-text-muted text-sm mb-2">{listing.address}, {listing.city}, {listing.state} {listing.zip}</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`)}`} target="_blank" rel="noopener noreferrer" className="text-mint hover:text-mint/80 text-sm font-medium transition-colors">
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-xl p-6 border border-white/5 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">📞 Contact</h2>
              <div className="space-y-3">
                {listing.phone && (
                  <a href={`tel:${listing.phone}`} className="flex items-center gap-3 bg-mint/10 hover:bg-mint/20 text-mint rounded-lg px-4 py-3 transition-colors w-full">
                    <span>📱</span>
                    <span className="font-medium">{formatPhone(listing.phone)}</span>
                  </a>
                )}
                {listing.website && (
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-teal/10 hover:bg-teal/20 text-teal rounded-lg px-4 py-3 transition-colors w-full">
                    <span>🌐</span>
                    <span className="font-medium">Visit Website</span>
                  </a>
                )}
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg px-4 py-3 transition-colors w-full">
                  <span>🗺️</span>
                  <span className="font-medium">Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarListings.map((l: any) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </section>
        )}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness", name: listing.name,
        address: { "@type": "PostalAddress", streetAddress: listing.address, addressLocality: listing.city, addressRegion: listing.state, postalCode: listing.zip, addressCountry: "US" },
        geo: { "@type": "GeoCoordinates", latitude: listing.lat, longitude: listing.lng },
        telephone: listing.phone || undefined, url: listing.website || undefined,
      })}} />
    </div>
  );
}
