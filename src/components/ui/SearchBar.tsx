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
      className="bg-white rounded-xl shadow-lg p-2 flex flex-col sm:flex-row gap-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by city, state, or zip..."
        className="flex-1 bg-section rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-hero/30 border border-border transition"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-section rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:ring-2 focus:ring-hero/30 border border-border transition cursor-pointer"
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
        className="bg-hero hover:bg-hero/90 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}
