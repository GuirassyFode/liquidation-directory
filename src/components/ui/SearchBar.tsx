"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-xl shadow-lg p-3 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by city, state, or zip..."
        className="flex-1 bg-dark rounded-lg px-4 py-3 text-sm text-text-body placeholder-text-muted outline-none focus:ring-2 focus:ring-mint/50 transition"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-dark rounded-lg px-4 py-3 text-sm text-text-body outline-none focus:ring-2 focus:ring-mint/50 transition cursor-pointer"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.icon} {cat.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-mint hover:bg-mint/90 text-dark font-semibold px-6 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}
