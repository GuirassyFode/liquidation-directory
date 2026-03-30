import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <Link href="/" className="text-lg font-bold mb-2 inline-block">
              <span className="text-white">Liquidation</span>
              <span className="text-mint">Lots</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              A directory of liquidation warehouses across the US.
              Free to use, no signup.
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div className="space-y-2">
              <Link href="/search" className="block text-text-muted hover:text-white transition-colors">Browse</Link>
              <Link href="/#categories" className="block text-text-muted hover:text-white transition-colors">Categories</Link>
              <Link href="/about" className="block text-text-muted hover:text-white transition-colors">About</Link>
            </div>
            <div className="space-y-2">
              <Link href="/about#submit" className="block text-text-muted hover:text-white transition-colors">Submit a listing</Link>
              <a href="https://x.com/SIATSERVICES" target="_blank" rel="noopener noreferrer" className="block text-text-muted hover:text-white transition-colors">
                X / Twitter
              </a>
              <a href="mailto:contact@siatservices.com" className="block text-text-muted hover:text-white transition-colors">
                Email us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-text-muted/50 text-xs">
          Made in Washington DC by SIAT Services &middot; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
