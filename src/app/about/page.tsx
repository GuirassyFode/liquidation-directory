import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* About Section */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          About LiquidationLots.com
        </h1>
        <div className="space-y-4 text-text-body leading-relaxed">
          <p>
            LiquidationLots.com is the premier directory for finding liquidation
            stores, pallet sellers, and wholesale liquidation lots across the
            United States. Whether you are a reseller looking for your next
            source of inventory or a bargain hunter searching for incredible
            deals, we help you find the best liquidation options near you.
          </p>
          <p>
            Our directory features hundreds of verified liquidation businesses,
            organized by category and location, making it easy to discover
            exactly what you are looking for. From electronics and furniture to
            mixed pallets and clothing, we cover every major liquidation
            category.
          </p>
          <p>
            We are committed to providing the most up-to-date and accurate
            directory of liquidation resources available anywhere online.
          </p>
        </div>

        {/* Submit a Listing */}
        <div id="submit" className="mt-12 bg-card rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Submit a Listing
          </h2>
          <p className="text-text-body mb-6">
            Own or know a liquidation store that should be listed in our
            directory? We would love to add it. Send us the details and we will
            get it listed.
          </p>
          <a
            href="mailto:contact@siatservices.com?subject=New Listing Submission"
            className="inline-block bg-mint hover:bg-mint/90 text-dark font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Submit via Email
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <div className="space-y-2 text-text-body">
            <p>
              Email:{" "}
              <a
                href="mailto:contact@siatservices.com"
                className="text-mint hover:underline"
              >
                contact@siatservices.com
              </a>
            </p>
            <p>
              Twitter:{" "}
              <a
                href="https://twitter.com/SIATSERVICES"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mint hover:underline"
              >
                @SIATSERVICES
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
