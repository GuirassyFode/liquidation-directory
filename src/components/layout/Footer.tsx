import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-section border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <Link href="/" className="text-lg font-bold">
              <span className="text-text-primary">Liquidation</span>
              <span className="text-hero">Lots</span>
            </Link>
            <p className="text-text-muted text-xs mt-2 max-w-xs">
              A free directory of liquidation warehouses across the US. No signup required.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <Link href="/search" className="text-text-muted hover:text-hero text-sm transition-colors">Browse</Link>
              <Link href="/about" className="text-text-muted hover:text-hero text-sm transition-colors">About</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/about#submit" className="text-text-muted hover:text-hero text-sm transition-colors">Submit a listing</Link>
              <a href="https://x.com/SIATSERVICES" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-hero text-sm transition-colors">X / Twitter</a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-text-muted text-xs">
            Made in Washington DC by SIAT Services
          </p>
        </div>
      </div>
    </footer>
  );
}
