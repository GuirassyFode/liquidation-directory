import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo + Description */}
          <div>
            <Link href="/" className="flex items-center gap-0.5 text-xl font-bold mb-4">
              <span className="text-white">Liquidation</span>
              <span className="text-mint">Lots</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              The #1 directory for liquidation lots. Find the best deals on
              liquidation merchandise near you.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Browse", href: "/search" },
                { label: "Categories", href: "/#categories" },
                { label: "About", href: "/about" },
                { label: "Submit Listing", href: "/about#submit" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-mint transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com/SIATSERVICES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-mint transition-colors text-sm"
                >
                  Twitter @SIATSERVICES
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@siatservices.com"
                  className="text-text-muted hover:text-mint transition-colors text-sm"
                >
                  contact@siatservices.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            &copy; 2025 SIAT Services. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">Built by SIAT Services</p>
        </div>
      </div>
    </footer>
  );
}
