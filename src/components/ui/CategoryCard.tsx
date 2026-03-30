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
      <div className="bg-white rounded-xl p-6 text-center border border-border hover:border-hero/30 hover:shadow-md transition-all duration-300">
        <span className="text-4xl block mb-3">{icon}</span>
        <h3 className="text-text-primary font-semibold text-sm group-hover:text-hero transition-colors">
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
