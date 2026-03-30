import Link from "next/link";

interface CategoryCardProps {
  name: string;
  slug: string;
  icon: string;
  listingCount?: number;
}

export default function CategoryCard({
  name,
  slug,
  icon,
  listingCount,
}: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group block">
      <div className="bg-card rounded-xl p-6 text-center border border-transparent hover:border-mint/30 transition-all duration-300">
        <span className="text-4xl block mb-3">{icon}</span>
        <h3 className="text-white font-semibold text-sm group-hover:text-mint transition-colors">
          {name}
        </h3>
        {listingCount !== undefined && (
          <p className="text-text-muted text-xs mt-1">
            {listingCount} {listingCount === 1 ? "listing" : "listings"}
          </p>
        )}
      </div>
    </Link>
  );
}
