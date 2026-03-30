import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - The Story Behind This Directory",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-mint text-sm font-semibold tracking-widest uppercase mb-4">
          About
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 leading-tight">
          I kept a spreadsheet of liquidation spots.<br />
          Then I turned it into this.
        </h1>

        <div className="space-y-5 text-text-body leading-relaxed">
          <p>
            Here&apos;s how this started: I was getting into reselling, and every time
            I searched for liquidation pallets near me, I&apos;d get the same
            three paid ads, a bunch of sketchy sites, and zero useful info.
          </p>
          <p>
            So I started a Google Sheet. Every warehouse I found, I&apos;d add
            it &mdash; address, phone number, what they carry, whether they let you
            walk in or if it&apos;s online-only. I cross-referenced Reddit threads,
            Facebook groups, and local forums to fill in the gaps.
          </p>
          <p>
            After a while the sheet got pretty long. A friend asked me to share it.
            Then another. I figured if this many people need this list, it should
            probably be a real website instead of a messy spreadsheet.
          </p>
          <p>
            So here we are. This directory is that list &mdash; cleaned up, searchable,
            and free to use. No accounts, no paywalls, no BS.
          </p>
        </div>

        <div className="border-t border-white/5 my-10"></div>

        {/* What's here */}
        <h2 className="text-xl font-bold text-white mb-4">What you&apos;ll find here</h2>
        <ul className="space-y-3 text-text-body">
          <li className="flex gap-3">
            <span className="text-mint font-bold">-</span>
            <span>Liquidation warehouses that sell pallets and truckloads</span>
          </li>
          <li className="flex gap-3">
            <span className="text-mint font-bold">-</span>
            <span>Bin stores where everything is a flat price</span>
          </li>
          <li className="flex gap-3">
            <span className="text-mint font-bold">-</span>
            <span>Online liquidation platforms with auction and fixed-price lots</span>
          </li>
          <li className="flex gap-3">
            <span className="text-mint font-bold">-</span>
            <span>Hours, phone numbers, and what categories they carry</span>
          </li>
        </ul>

        <div className="border-t border-white/5 my-10"></div>

        {/* What's NOT here */}
        <h2 className="text-xl font-bold text-white mb-4">What&apos;s not here (yet)</h2>
        <p className="text-text-muted leading-relaxed mb-4">
          This is still early. I&apos;m adding new listings every week and working
          on features like map view, user reviews, and a way for warehouse owners
          to claim and update their listings. If something&apos;s wrong or missing,
          that&apos;s on me &mdash; let me know and I&apos;ll fix it.
        </p>

        <div className="border-t border-white/5 my-10"></div>

        {/* Submit */}
        <div id="submit" className="bg-card rounded-xl p-8 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-3">
            Know a spot we&apos;re missing?
          </h2>
          <p className="text-text-muted mb-6 leading-relaxed">
            If you own a liquidation warehouse or know one that should be on here,
            shoot me an email. I&apos;ll get it listed within 24 hours. It&apos;s free.
          </p>
          <a
            href="mailto:contact@siatservices.com?subject=New listing for the directory"
            className="inline-block bg-mint hover:bg-mint/90 text-dark font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Send me the details
          </a>
        </div>

        <div className="border-t border-white/5 my-10"></div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row gap-6 text-sm">
          <div>
            <p className="text-text-muted mb-1">Email</p>
            <a href="mailto:contact@siatservices.com" className="text-white hover:text-mint transition-colors">
              contact@siatservices.com
            </a>
          </div>
          <div>
            <p className="text-text-muted mb-1">Twitter</p>
            <a href="https://twitter.com/SIATSERVICES" target="_blank" rel="noopener noreferrer" className="text-white hover:text-mint transition-colors">
              @SIATSERVICES
            </a>
          </div>
          <div>
            <p className="text-text-muted mb-1">Built by</p>
            <span className="text-white">SIAT Services, Washington DC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
