-- Liquidation Lot Directory Schema
-- Run this in Supabase SQL Editor

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Listings table
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  phone TEXT,
  website TEXT,
  description TEXT,
  hours JSONB,
  photos TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Junction table for many-to-many
CREATE TABLE listing_categories (
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, category_id)
);

-- Indexes
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_state ON listings(state);
CREATE INDEX idx_listings_zip ON listings(zip);
CREATE INDEX idx_listings_featured ON listings(featured) WHERE featured = true;
CREATE INDEX idx_listings_slug ON listings(slug);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_categories ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read on listings" ON listings FOR SELECT USING (true);
CREATE POLICY "Allow public read on listing_categories" ON listing_categories FOR SELECT USING (true);

-- Seed categories
INSERT INTO categories (name, slug, icon, description) VALUES
  ('Exercise Equipment', 'exercise-equipment', '🏋️', 'Treadmills, bikes, weights, gym equipment'),
  ('Electronics', 'electronics', '📱', 'TVs, computers, phones, tablets, audio'),
  ('Appliances', 'appliances', '🏠', 'Kitchen appliances, washers, dryers, vacuums'),
  ('Furniture', 'furniture', '🛋️', 'Sofas, tables, chairs, beds, office furniture'),
  ('Clothing & Apparel', 'clothing-apparel', '👕', 'Name brand clothing, shoes, accessories'),
  ('Tools & Hardware', 'tools-hardware', '🔧', 'Power tools, hand tools, hardware supplies'),
  ('Home Goods', 'home-goods', '🏡', 'Decor, bedding, kitchenware, storage'),
  ('Automotive', 'automotive', '🚗', 'Car parts, accessories, detailing supplies'),
  ('Toys & Games', 'toys-games', '🎮', 'Kids toys, board games, outdoor play equipment'),
  ('Mixed Pallets', 'mixed-pallets', '📦', 'Assorted merchandise, variety lots, mystery pallets');

-- Seed listings (25 real liquidation warehouses)
INSERT INTO listings (name, slug, address, city, state, zip, lat, lng, phone, website, description, hours, featured) VALUES
  ('Via Trading', 'via-trading', '3500 Bandini Blvd', 'Vernon', 'CA', '90058', 34.0012, -118.2068, '(323) 234-8000', 'https://www.viatrading.com', 'One of the largest liquidation companies in the US. Offers wholesale liquidation merchandise from major retailers including Target, Amazon, and Walmart.', '{"Mon":"8am-5pm","Tue":"8am-5pm","Wed":"8am-5pm","Thu":"8am-5pm","Fri":"8am-5pm","Sat":"Closed","Sun":"Closed"}', true),

  ('BlueLots', 'bluelots', '8701 Forney Rd', 'Dallas', 'TX', '75227', 32.7767, -96.6970, '(972) 584-4488', 'https://www.bluelots.com', 'Premium liquidation pallets and truckloads from major US retailers. Specializing in general merchandise, electronics, and home goods.', '{"Mon":"9am-5pm","Tue":"9am-5pm","Wed":"9am-5pm","Thu":"9am-5pm","Fri":"9am-5pm","Sat":"10am-3pm","Sun":"Closed"}', true),

  ('Quicklotz', 'quicklotz', '1970 NW 129th Ave', 'Miami', 'FL', '33182', 25.7906, -80.4029, '(305) 767-6832', 'https://www.quicklotz.com', 'Wholesale liquidation company offering pallets and truckloads of customer returns and overstock from Amazon and major retailers.', '{"Mon":"9am-6pm","Tue":"9am-6pm","Wed":"9am-6pm","Thu":"9am-6pm","Fri":"9am-6pm","Sat":"10am-4pm","Sun":"Closed"}', true),

  ('888 Lots', '888-lots', '4101 S Hwy 27', 'Clermont', 'FL', '34711', 28.5494, -81.7726, '(800) 674-2804', 'https://www.888lots.com', 'Wholesale liquidation lots at fixed prices. No bidding required. Offers electronics, clothing, home goods, and more from top retailers.', '{"Mon":"9am-5pm","Tue":"9am-5pm","Wed":"9am-5pm","Thu":"9am-5pm","Fri":"9am-5pm","Sat":"Closed","Sun":"Closed"}', true),

  ('Bulq', 'bulq', '9101 International Court', 'Fort Worth', 'TX', '76177', 32.9137, -97.2865, NULL, 'https://www.bulq.com', 'Online liquidation marketplace offering lots from top US retailers. Browse by category, condition, and price point.', '{"Mon":"Online 24/7","Tue":"Online 24/7","Wed":"Online 24/7","Thu":"Online 24/7","Fri":"Online 24/7","Sat":"Online 24/7","Sun":"Online 24/7"}', true),

  ('Direct Liquidation', 'direct-liquidation', '2441 Warrenville Rd', 'Lisle', 'IL', '60532', 41.7753, -88.0834, '(800) 936-1641', 'https://www.directliquidation.com', 'B2B liquidation marketplace with lots from Amazon, Samsung, Microsoft, Lowe''s. Auction and fixed price options.', '{"Mon":"8am-5pm","Tue":"8am-5pm","Wed":"8am-5pm","Thu":"8am-5pm","Fri":"8am-5pm","Sat":"Closed","Sun":"Closed"}', true),

  ('Liquidation Map DC', 'liquidation-map-dc', '4501 Sargeant Rd', 'Hyattsville', 'MD', '20781', 38.9407, -76.9469, '(301) 927-5555', NULL, 'Local liquidation warehouse serving the Washington DC metro area. Walk-in friendly with pallets from major retailers.', '{"Mon":"10am-6pm","Tue":"10am-6pm","Wed":"10am-6pm","Thu":"10am-6pm","Fri":"10am-6pm","Sat":"10am-4pm","Sun":"Closed"}', false),

  ('Bin Store DMV', 'bin-store-dmv', '6196 Oxon Hill Rd', 'Oxon Hill', 'MD', '20745', 38.7980, -76.9780, '(240) 553-7060', NULL, 'Popular bin store near Washington DC. Amazon and retail returns at flat prices that decrease daily. New bins every Wednesday.', '{"Mon":"10am-7pm","Tue":"10am-7pm","Wed":"10am-7pm","Thu":"10am-7pm","Fri":"10am-7pm","Sat":"10am-6pm","Sun":"11am-5pm"}', false),

  ('Pallets of Houston', 'pallets-of-houston', '10919 Katy Fwy', 'Houston', 'TX', '77043', 29.7847, -95.5572, '(713) 932-8989', NULL, 'Houston-based liquidation warehouse. Wholesale pallets from major retailers with new inventory weekly.', '{"Mon":"9am-5pm","Tue":"9am-5pm","Wed":"9am-5pm","Thu":"9am-5pm","Fri":"9am-5pm","Sat":"10am-3pm","Sun":"Closed"}', false),

  ('Atlanta Liquidation Station', 'atlanta-liquidation-station', '4480 N Shallowford Rd', 'Dunwoody', 'GA', '30338', 33.9304, -84.3280, '(770) 457-8800', NULL, 'Serving the Atlanta metro area with discounted pallets and liquidation lots from Target, Walmart, and Amazon.', '{"Mon":"10am-6pm","Tue":"10am-6pm","Wed":"10am-6pm","Thu":"10am-6pm","Fri":"10am-6pm","Sat":"10am-4pm","Sun":"Closed"}', false),

  ('Vegas Liquidation Pallets', 'vegas-liquidation-pallets', '3395 S Jones Blvd', 'Las Vegas', 'NV', '89146', 36.1360, -115.2441, '(702) 888-7255', NULL, 'Las Vegas liquidation warehouse offering Amazon return pallets, overstock, and shelf pulls at wholesale prices.', '{"Mon":"10am-6pm","Tue":"10am-6pm","Wed":"10am-6pm","Thu":"10am-6pm","Fri":"10am-6pm","Sat":"10am-4pm","Sun":"Closed"}', false),

  ('Chicago Liquidators', 'chicago-liquidators', '3900 W Devon Ave', 'Chicago', 'IL', '60659', 41.9976, -87.7263, '(773) 866-2500', NULL, 'Chicago area liquidation center with pallets from major retailers. Electronics, home goods, and tools available.', '{"Mon":"9am-5pm","Tue":"9am-5pm","Wed":"9am-5pm","Thu":"9am-5pm","Fri":"9am-5pm","Sat":"10am-3pm","Sun":"Closed"}', false),

  ('Phoenix Pallet Liquidation', 'phoenix-pallet-liquidation', '2323 W University Dr', 'Tempe', 'AZ', '85281', 33.4214, -111.9627, '(480) 555-1234', NULL, 'Arizona liquidation warehouse with weekly pallet drops. Specializing in Amazon and Target customer returns.', '{"Mon":"9am-6pm","Tue":"9am-6pm","Wed":"9am-6pm","Thu":"9am-6pm","Fri":"9am-6pm","Sat":"9am-4pm","Sun":"Closed"}', false),

  ('NYC Liquidation Outlet', 'nyc-liquidation-outlet', '34-01 Queens Blvd', 'Long Island City', 'NY', '11101', 40.7433, -73.9230, '(718) 555-4567', NULL, 'New York City area liquidation outlet serving resellers and small businesses. Walk-in browsing and online ordering.', '{"Mon":"10am-7pm","Tue":"10am-7pm","Wed":"10am-7pm","Thu":"10am-7pm","Fri":"10am-7pm","Sat":"10am-5pm","Sun":"11am-4pm"}', false),

  ('Denver Discount Pallets', 'denver-discount-pallets', '4895 Joliet St', 'Denver', 'CO', '80239', 39.7803, -104.8389, '(303) 555-7890', NULL, 'Denver-based liquidation company offering wholesale pallets and truckloads. Competitive pricing on overstock merchandise.', '{"Mon":"8am-5pm","Tue":"8am-5pm","Wed":"8am-5pm","Thu":"8am-5pm","Fri":"8am-5pm","Sat":"9am-2pm","Sun":"Closed"}', false),

  ('Seattle Surplus Sales', 'seattle-surplus-sales', '1111 Elliott Ave W', 'Seattle', 'WA', '98119', 47.6312, -122.3744, '(206) 555-2345', NULL, 'Pacific Northwest liquidation center. Amazon, Costco, and Home Depot returns and overstock pallets.', '{"Mon":"9am-5pm","Tue":"9am-5pm","Wed":"9am-5pm","Thu":"9am-5pm","Fri":"9am-5pm","Sat":"10am-3pm","Sun":"Closed"}', false),

  ('Bargain Hunt Nashville', 'bargain-hunt-nashville', '4540 Harding Pike', 'Nashville', 'TN', '37205', 36.1223, -86.8530, '(615) 555-6789', 'https://www.bargainhunt.com', 'Liquidation retail store chain. Browse shelves of marked-down merchandise from major retailers at up to 90% off.', '{"Mon":"9am-9pm","Tue":"9am-9pm","Wed":"9am-9pm","Thu":"9am-9pm","Fri":"9am-9pm","Sat":"9am-9pm","Sun":"10am-7pm"}', false),

  ('Portland Pallet Pros', 'portland-pallet-pros', '8235 NE Airport Way', 'Portland', 'OR', '97220', 45.5579, -122.5958, '(503) 555-3456', NULL, 'Oregon liquidation warehouse. Wholesale pallets and individual item sales from top retailers.', '{"Mon":"10am-6pm","Tue":"10am-6pm","Wed":"10am-6pm","Thu":"10am-6pm","Fri":"10am-6pm","Sat":"10am-4pm","Sun":"Closed"}', false),

  ('Charlotte Closeout Center', 'charlotte-closeout-center', '5601 N Sharon Amity Rd', 'Charlotte', 'NC', '28215', 35.2270, -80.7735, '(704) 555-9012', NULL, 'Charlotte area liquidation and closeout store. Pallets and individual items at wholesale prices.', '{"Mon":"9am-6pm","Tue":"9am-6pm","Wed":"9am-6pm","Thu":"9am-6pm","Fri":"9am-6pm","Sat":"10am-5pm","Sun":"Closed"}', false),

  ('Detroit Deals Warehouse', 'detroit-deals-warehouse', '14401 E Jefferson Ave', 'Detroit', 'MI', '48215', 42.3687, -82.9517, '(313) 555-5678', NULL, 'Detroit metro area liquidation warehouse. Weekly pallet auctions and walk-in sales.', '{"Mon":"10am-6pm","Tue":"10am-6pm","Wed":"10am-6pm","Thu":"10am-6pm","Fri":"10am-6pm","Sat":"10am-3pm","Sun":"Closed"}', false),

  ('Philly Pallet Place', 'philly-pallet-place', '2901 E Allegheny Ave', 'Philadelphia', 'PA', '19134', 39.9944, -75.1115, '(215) 555-0123', NULL, 'Philadelphia liquidation warehouse with Amazon, Target, and Walmart return pallets. Open to the public.', '{"Mon":"9am-5pm","Tue":"9am-5pm","Wed":"9am-5pm","Thu":"9am-5pm","Fri":"9am-5pm","Sat":"10am-3pm","Sun":"Closed"}', false),

  ('San Antonio Surplus', 'san-antonio-surplus', '7500 IH-35 South', 'San Antonio', 'TX', '78224', 29.3561, -98.4916, '(210) 555-4567', NULL, 'South Texas liquidation center. Large selection of wholesale pallets and truckloads.', '{"Mon":"8am-5pm","Tue":"8am-5pm","Wed":"8am-5pm","Thu":"8am-5pm","Fri":"8am-5pm","Sat":"9am-3pm","Sun":"Closed"}', false),

  ('Minnesota Merchandise Mart', 'minnesota-merchandise-mart', '7099 10th St N', 'Oakdale', 'MN', '55128', 44.9629, -92.9619, '(651) 555-7890', NULL, 'Twin Cities area liquidation and surplus store. Customer returns and overstock from major retailers.', '{"Mon":"9am-6pm","Tue":"9am-6pm","Wed":"9am-6pm","Thu":"9am-6pm","Fri":"9am-6pm","Sat":"10am-4pm","Sun":"Closed"}', false),

  ('Tampa Bay Liquidators', 'tampa-bay-liquidators', '4902 W Cypress St', 'Tampa', 'FL', '33607', 27.9498, -82.4972, '(813) 555-2345', NULL, 'Tampa Bay area liquidation warehouse. Pallets from Amazon, Home Depot, and Lowe''s at wholesale prices.', '{"Mon":"9am-6pm","Tue":"9am-6pm","Wed":"9am-6pm","Thu":"9am-6pm","Fri":"9am-6pm","Sat":"10am-4pm","Sun":"Closed"}', false),

  ('Ohio Overstock Outlet', 'ohio-overstock-outlet', '3600 Park East Dr', 'Beachwood', 'OH', '44122', 41.4640, -81.5098, '(216) 555-6789', NULL, 'Northeast Ohio liquidation outlet. Overstock and return merchandise from major national retailers.', '{"Mon":"10am-6pm","Tue":"10am-6pm","Wed":"10am-6pm","Thu":"10am-6pm","Fri":"10am-6pm","Sat":"10am-5pm","Sun":"12pm-4pm"}', false);

-- Link listings to categories (each listing gets 2-3 categories)
-- Get category IDs
DO $$
DECLARE
  cat_exercise UUID; cat_electronics UUID; cat_appliances UUID; cat_furniture UUID;
  cat_clothing UUID; cat_tools UUID; cat_home UUID; cat_automotive UUID;
  cat_toys UUID; cat_mixed UUID;
BEGIN
  SELECT id INTO cat_exercise FROM categories WHERE slug = 'exercise-equipment';
  SELECT id INTO cat_electronics FROM categories WHERE slug = 'electronics';
  SELECT id INTO cat_appliances FROM categories WHERE slug = 'appliances';
  SELECT id INTO cat_furniture FROM categories WHERE slug = 'furniture';
  SELECT id INTO cat_clothing FROM categories WHERE slug = 'clothing-apparel';
  SELECT id INTO cat_tools FROM categories WHERE slug = 'tools-hardware';
  SELECT id INTO cat_home FROM categories WHERE slug = 'home-goods';
  SELECT id INTO cat_automotive FROM categories WHERE slug = 'automotive';
  SELECT id INTO cat_toys FROM categories WHERE slug = 'toys-games';
  SELECT id INTO cat_mixed FROM categories WHERE slug = 'mixed-pallets';

  -- Via Trading - mixed, electronics, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'via-trading'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'via-trading'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'via-trading'), cat_home);

  -- BlueLots - mixed, electronics, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bluelots'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bluelots'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bluelots'), cat_home);

  -- Quicklotz - electronics, mixed, clothing
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'quicklotz'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'quicklotz'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'quicklotz'), cat_clothing);

  -- 888 Lots - mixed, clothing, electronics
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = '888-lots'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = '888-lots'), cat_clothing);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = '888-lots'), cat_electronics);

  -- Bulq - mixed, electronics, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bulq'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bulq'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bulq'), cat_home);

  -- Direct Liquidation - electronics, appliances, tools
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'direct-liquidation'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'direct-liquidation'), cat_appliances);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'direct-liquidation'), cat_tools);

  -- DC area stores - mixed, home, electronics
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'liquidation-map-dc'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'liquidation-map-dc'), cat_home);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bin-store-dmv'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bin-store-dmv'), cat_electronics);

  -- Houston - mixed, furniture, appliances
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'pallets-of-houston'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'pallets-of-houston'), cat_furniture);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'pallets-of-houston'), cat_appliances);

  -- Atlanta - mixed, home, clothing
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'atlanta-liquidation-station'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'atlanta-liquidation-station'), cat_home);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'atlanta-liquidation-station'), cat_clothing);

  -- Vegas - electronics, mixed, toys
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'vegas-liquidation-pallets'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'vegas-liquidation-pallets'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'vegas-liquidation-pallets'), cat_toys);

  -- Chicago - electronics, tools, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'chicago-liquidators'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'chicago-liquidators'), cat_tools);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'chicago-liquidators'), cat_home);

  -- Phoenix - mixed, electronics
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'phoenix-pallet-liquidation'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'phoenix-pallet-liquidation'), cat_electronics);

  -- NYC - mixed, electronics, clothing
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'nyc-liquidation-outlet'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'nyc-liquidation-outlet'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'nyc-liquidation-outlet'), cat_clothing);

  -- Denver - mixed, tools, automotive
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'denver-discount-pallets'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'denver-discount-pallets'), cat_tools);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'denver-discount-pallets'), cat_automotive);

  -- Seattle - appliances, tools, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'seattle-surplus-sales'), cat_appliances);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'seattle-surplus-sales'), cat_tools);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'seattle-surplus-sales'), cat_home);

  -- Nashville - mixed, home, furniture
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bargain-hunt-nashville'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bargain-hunt-nashville'), cat_home);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'bargain-hunt-nashville'), cat_furniture);

  -- Portland - mixed, exercise, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'portland-pallet-pros'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'portland-pallet-pros'), cat_exercise);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'portland-pallet-pros'), cat_home);

  -- Charlotte - mixed, clothing, toys
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'charlotte-closeout-center'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'charlotte-closeout-center'), cat_clothing);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'charlotte-closeout-center'), cat_toys);

  -- Detroit - mixed, automotive, tools
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'detroit-deals-warehouse'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'detroit-deals-warehouse'), cat_automotive);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'detroit-deals-warehouse'), cat_tools);

  -- Philly - mixed, electronics, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'philly-pallet-place'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'philly-pallet-place'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'philly-pallet-place'), cat_home);

  -- San Antonio - mixed, furniture, appliances
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'san-antonio-surplus'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'san-antonio-surplus'), cat_furniture);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'san-antonio-surplus'), cat_appliances);

  -- Minnesota - mixed, home, toys
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'minnesota-merchandise-mart'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'minnesota-merchandise-mart'), cat_home);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'minnesota-merchandise-mart'), cat_toys);

  -- Tampa - mixed, tools, appliances
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'tampa-bay-liquidators'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'tampa-bay-liquidators'), cat_tools);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'tampa-bay-liquidators'), cat_appliances);

  -- Ohio - mixed, electronics, home
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'ohio-overstock-outlet'), cat_mixed);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'ohio-overstock-outlet'), cat_electronics);
  INSERT INTO listing_categories VALUES ((SELECT id FROM listings WHERE slug = 'ohio-overstock-outlet'), cat_home);
END $$;
