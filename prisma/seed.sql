-- Mock data for react-shop
-- Import with: sqlite3 prisma/shop.db < prisma/seed.sql

-- ============================================================
-- Clear existing data (order matters due to foreign keys)
-- ============================================================
DELETE FROM ProductCategory;
DELETE FROM OrderProducts;
DELETE FROM OrderLog;
DELETE FROM "Order";
DELETE FROM Product;
DELETE FROM Category;

-- ============================================================
-- Categories
-- ============================================================
INSERT INTO Category (id, name) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Home & Kitchen'),
(4, 'Sports & Outdoors'),
(5, 'Books'),
(6, 'Toys & Games'),
(7, 'Beauty & Personal Care'),
(8, 'Food & Beverages');

-- ============================================================
-- Products (50 items)
-- ============================================================
INSERT INTO Product (id, title, shortDesc, description, image, price) VALUES
(1, 'Wireless Bluetooth Headphones', 'Premium noise-cancelling over-ear headphones', 'Experience superior sound quality with these wireless Bluetooth headphones featuring active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions. Compatible with all Bluetooth-enabled devices.', '/images/product_1.jpg', 7999),
(2, 'Smartphone Stand & Charger', 'Adjustable stand with fast wireless charging', 'Keep your phone visible and charged with this sleek aluminum stand featuring 15W fast wireless charging. Adjustable viewing angle, non-slip base, and LED indicator. Works with all Qi-compatible phones.', '/images/product_2.jpg', 3499),
(3, 'Mechanical Keyboard', 'RGB backlit mechanical gaming keyboard', 'Full-size mechanical keyboard with Cherry MX Brown switches, customizable per-key RGB lighting, N-key rollover, and detachable USB-C cable. Durable aluminum frame built to last.', '/images/product_3.jpg', 8999),
(4, 'Portable Bluetooth Speaker', 'Waterproof speaker with 360-degree sound', 'Take your music anywhere with this IPX7 waterproof portable speaker. Delivers rich 360-degree sound, 20-hour battery life, and pairs with a second speaker for stereo mode.', '/images/product_4.jpg', 4999),
(5, 'USB-C Hub Adapter', '7-in-1 USB-C multiport adapter', 'Expand your laptop connectivity with HDMI 4K output, 3 USB 3.0 ports, SD/TF card readers, and 100W power delivery pass-through. Compact and travel-friendly design.', '/images/product_5.jpg', 2999),
(6, 'Slim Fit Cotton T-Shirt', 'Premium organic cotton crew neck tee', 'Classic crew neck t-shirt made from 100% organic cotton. Pre-shrunk, breathable fabric with reinforced stitching. Available in multiple colors. Machine washable.', '/images/product_6.jpg', 1999),
(7, 'Denim Jacket', 'Classic vintage wash denim jacket', 'Timeless denim jacket with a modern fit. Features button closure, two chest pockets, side pockets, and adjustable button cuffs. Medium-weight denim perfect for layering.', '/images/product_7.jpg', 5999),
(8, 'Running Sneakers', 'Lightweight breathable mesh running shoes', 'Engineered mesh upper for maximum breathability. Responsive foam midsole absorbs impact while the rubber outsole provides excellent traction on any surface. Weighs only 250g.', '/images/product_8.jpg', 8499),
(9, 'Wool Blend Beanie', 'Warm knitted beanie for winter', 'Soft merino wool blend beanie with a classic ribbed knit pattern. Fleece-lined interior for extra warmth. One size fits most. Perfect for cold weather adventures.', '/images/product_9.jpg', 1499),
(10, 'Leather Belt', 'Genuine leather belt with brushed buckle', 'Handcrafted from full-grain leather with a brushed nickel buckle. 35mm width suits both casual and formal wear. Available in brown and black.', '/images/product_10.jpg', 2499),
(11, 'Non-Stick Frying Pan Set', '3-piece ceramic coated frying pan set', 'Set of 8", 10", and 12" frying pans with eco-friendly ceramic non-stick coating. PFOA-free, oven-safe up to 450°F, and compatible with all stovetops including induction.', '/images/product_11.jpg', 4499),
(12, 'Stainless Steel Water Bottle', 'Double-wall insulated 750ml bottle', 'Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof lid with one-hand operation. Fits standard cup holders. Durable powder-coated finish.', '/images/product_12.jpg', 2299),
(13, 'Bamboo Cutting Board Set', '3-piece organic bamboo cutting boards', 'Eco-friendly bamboo cutting boards in three sizes. Naturally antimicrobial, knife-friendly surface with juice grooves. Easy-grip handles and easy to clean.', '/images/product_13.jpg', 2799),
(14, 'LED Desk Lamp', 'Adjustable LED lamp with USB charging port', 'Modern desk lamp with 5 brightness levels and 3 color temperatures. Flexible gooseneck design, built-in USB charging port, and memory function. Energy-efficient LED.', '/images/product_14.jpg', 3299),
(15, 'Scented Candle Set', 'Set of 4 natural soy wax candles', 'Hand-poured soy wax candles with cotton wicks. Includes lavender, vanilla, eucalyptus, and sandalwood scents. 40-hour burn time each. Comes in decorative glass jars.', '/images/product_15.jpg', 2499),
(16, 'Yoga Mat', 'Non-slip eco-friendly exercise mat', 'Extra thick 6mm yoga mat with alignment markings. Made from natural rubber with a microfiber surface for superior grip. Includes carrying strap. 183cm x 68cm.', '/images/product_16.jpg', 3999),
(17, 'Resistance Band Set', '5-piece latex resistance band kit', 'Complete set of 5 resistance levels from light to extra heavy. Includes door anchor, ankle straps, and carrying bag. Perfect for home workouts and physical therapy.', '/images/product_17.jpg', 1999),
(18, 'Hiking Backpack 40L', 'Lightweight water-resistant hiking pack', 'Durable 40L backpack with padded hip belt, ventilated back panel, and multiple compartments. Includes rain cover, hydration bladder sleeve, and trekking pole attachments.', '/images/product_18.jpg', 6999),
(19, 'Tennis Racket', 'Graphite composite tennis racket', 'Lightweight graphite composite frame with vibration dampening. 100 sq inch head size, pre-strung with synthetic gut. Comes with protective cover.', '/images/product_19.jpg', 5499),
(20, 'Cycling Gloves', 'Padded half-finger cycling gloves', 'Gel-padded palms reduce hand fatigue on long rides. Breathable mesh back, pull-off tabs, and reflective accents for visibility. Touchscreen-compatible thumb and index finger.', '/images/product_20.jpg', 1799),
(21, 'The Art of Programming', 'Comprehensive guide to modern software', 'A thorough exploration of programming fundamentals, design patterns, and best practices. Covers multiple languages with practical examples. 580 pages.', '/images/product_21.jpg', 3999),
(22, 'Cooking Essentials Cookbook', '200+ easy recipes for home cooks', 'From quick weeknight dinners to impressive weekend feasts, this cookbook covers it all. Step-by-step instructions, nutritional information, and beautiful photography throughout.', '/images/product_22.jpg', 2799),
(23, 'World Atlas & Geography Guide', 'Illustrated atlas with detailed maps', 'Comprehensive world atlas featuring political and physical maps, demographic data, climate charts, and cultural insights for every country. Updated edition with 320 pages.', '/images/product_23.jpg', 3499),
(24, 'Science Fiction Collection', 'Anthology of classic sci-fi stories', 'A curated collection of 25 groundbreaking science fiction stories from the genre''s greatest authors. Includes a foreword and author biographies. 450 pages.', '/images/product_24.jpg', 1899),
(25, 'Mindfulness & Meditation Guide', 'Practical guide to daily meditation', 'Learn meditation techniques backed by neuroscience research. Includes 30-day guided program, breathing exercises, and tips for building a sustainable practice. 240 pages.', '/images/product_25.jpg', 1699),
(26, 'Building Block Set 500pc', 'Creative building blocks for all ages', 'Compatible with major brands, this 500-piece set includes bricks, plates, wheels, and specialty pieces in 15 colors. Comes with sorting tray and idea booklet. Ages 4+.', '/images/product_26.jpg', 3499),
(27, 'Strategy Board Game', 'Award-winning strategy game for 2-4 players', 'Build your civilization from the ground up in this critically acclaimed board game. Average playtime 60-90 minutes. Includes 200+ cards, game board, and wooden tokens.', '/images/product_27.jpg', 4499),
(28, 'RC Racing Car', 'High-speed remote control racing car', '1:16 scale RC car reaching speeds up to 30km/h. 2.4GHz remote with 80m range. Rechargeable battery provides 25 minutes of runtime. Shockproof body and all-terrain tires.', '/images/product_28.jpg', 3999),
(29, 'Puzzle 1000 Pieces', 'Scenic landscape jigsaw puzzle', 'Premium 1000-piece jigsaw puzzle featuring a stunning mountain lake landscape. Precision-cut pieces with anti-glare finish. Completed size: 70cm x 50cm. Includes poster.', '/images/product_29.jpg', 1499),
(30, 'Plush Teddy Bear', 'Soft cuddly teddy bear 40cm', 'Ultra-soft plush teddy bear made with hypoallergenic materials. Safety-tested for all ages. Features embroidered eyes and a cute ribbon bow. Machine washable.', '/images/product_30.jpg', 1999),
(31, 'Facial Moisturizer SPF 30', 'Daily hydrating moisturizer with sun protection', 'Lightweight, non-greasy formula with hyaluronic acid, vitamin E, and broad-spectrum SPF 30. Suitable for all skin types. Dermatologist tested. 50ml.', '/images/product_31.jpg', 2299),
(32, 'Hair Styling Kit', 'Professional styling tools set', 'Includes ceramic flat iron, curling wand, and heat-resistant gloves. Adjustable temperature up to 230°C, auto-shutoff safety feature, and dual voltage for travel.', '/images/product_32.jpg', 5499),
(33, 'Essential Oil Diffuser', 'Ultrasonic aromatherapy diffuser 300ml', 'Whisper-quiet ultrasonic diffuser with 7 LED color options and 4 timer settings. Covers up to 30 sq meters. Auto shut-off when water runs low. BPA-free.', '/images/product_33.jpg', 2999),
(34, 'Bamboo Toothbrush Set', 'Eco-friendly bamboo toothbrush 4-pack', 'Biodegradable bamboo handles with BPA-free charcoal-infused bristles. Individually numbered for family use. Comes in recyclable packaging.', '/images/product_34.jpg', 899),
(35, 'Shaving Kit', 'Complete grooming kit with safety razor', 'Classic safety razor with 10 double-edge blades, shaving brush, and sandalwood shaving soap. Chrome-plated razor with weighted handle for a smooth, close shave.', '/images/product_35.jpg', 3999),
(36, 'Organic Green Tea', 'Premium Japanese sencha green tea', 'First-flush organic sencha from Shizuoka, Japan. Rich in antioxidants with a smooth, refreshing taste. 100 biodegradable tea bags. USDA Organic certified.', '/images/product_36.jpg', 1299),
(37, 'Dark Chocolate Assortment', 'Artisan dark chocolate gift box', 'Collection of 24 handcrafted dark chocolates with fillings including sea salt caramel, raspberry, espresso, and hazelnut praline. 70% cacao. Net weight 300g.', '/images/product_37.jpg', 2499),
(38, 'Ground Coffee Blend', 'Medium roast arabica coffee 500g', 'Expertly blended medium roast from Colombian and Ethiopian arabica beans. Tasting notes of chocolate, citrus, and caramel. Freshly roasted and nitrogen-sealed.', '/images/product_38.jpg', 1499),
(39, 'Mixed Nuts & Trail Mix', 'Premium roasted nut mix 750g', 'A hearty blend of almonds, cashews, walnuts, pecans, and macadamias with dried cranberries and dark chocolate chips. Lightly sea-salted. No artificial preservatives.', '/images/product_39.jpg', 1799),
(40, 'Hot Sauce Collection', 'Artisan hot sauce 3-bottle set', 'Three unique hot sauces ranging from mild to extra hot. Made with fresh peppers, no artificial ingredients. Includes smoky chipotle, habanero mango, and carolina reaper.', '/images/product_40.jpg', 1999),
(41, 'Wireless Mouse', 'Ergonomic wireless optical mouse', 'Sculpted ergonomic design reduces wrist strain. 4000 DPI optical sensor, 6 programmable buttons, and silent click switches. USB-C rechargeable with 3-month battery life.', '/images/product_41.jpg', 2999),
(42, 'Webcam HD 1080p', 'Full HD webcam with built-in microphone', 'Crystal-clear 1080p video at 30fps with auto-focus and light correction. Dual noise-cancelling microphones, privacy cover, and universal clip mount. Plug and play.', '/images/product_42.jpg', 4499),
(43, 'Linen Shirt', 'Relaxed fit pure linen button-down', 'Breathable 100% linen shirt perfect for warm weather. Features a relaxed fit, button-down collar, and chest pocket. Pre-washed for a soft feel from day one.', '/images/product_43.jpg', 4499),
(44, 'Throw Blanket', 'Chunky knit decorative throw blanket', 'Luxuriously soft chenille throw blanket with a chunky knit pattern. Perfect for the couch or bed. Machine washable, 130cm x 170cm. Hypoallergenic.', '/images/product_44.jpg', 3499),
(45, 'Cast Iron Skillet', 'Pre-seasoned 12-inch cast iron skillet', 'Pre-seasoned with vegetable oil for a natural non-stick surface that improves with use. Even heat distribution, oven-safe, and built to last generations. Includes silicone handle cover.', '/images/product_45.jpg', 3299),
(46, 'Jump Rope', 'Weighted speed jump rope with counter', 'Ball-bearing handles for smooth, tangle-free rotation. Built-in digital counter tracks jumps, calories, and time. Adjustable cable length. Weighted handles for upper body workout.', '/images/product_46.jpg', 1499),
(47, 'Graphic Novel Collection', 'Bestselling graphic novel box set', 'Award-winning graphic novel trilogy in a collectible slipcase. Over 700 pages of stunning artwork and compelling storytelling. Full-color, hardcover editions.', '/images/product_47.jpg', 4999),
(48, 'Card Game Party Pack', 'Hilarious party card game for groups', 'The ultimate party game for 4-10 players. 500 prompt cards and 500 response cards ensure endless replayability. Ages 17+. Average game time 30-60 minutes.', '/images/product_48.jpg', 2499),
(49, 'Lip Balm Set', 'Organic lip balm 5-pack assorted flavors', 'USDA Organic lip balms with beeswax, coconut oil, and shea butter. Flavors include mint, honey, berry, vanilla, and citrus. SPF 15 sun protection. 4.25g each.', '/images/product_49.jpg', 999),
(50, 'Protein Bar Box', 'High protein snack bars 12-pack', 'Each bar packs 20g of plant-based protein with only 2g sugar. Flavors include chocolate peanut butter, cookies & cream, and salted caramel. Gluten-free and vegan.', '/images/product_50.jpg', 2999);

-- ============================================================
-- ProductCategory (many-to-many relationships)
-- ============================================================
INSERT INTO ProductCategory (productID, categoryID) VALUES
-- Electronics
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (41, 1), (42, 1),
-- Clothing
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2), (43, 2),
-- Home & Kitchen
(11, 3), (12, 3), (13, 3), (14, 3), (15, 3), (44, 3), (45, 3),
-- Sports & Outdoors
(8, 4), (16, 4), (17, 4), (18, 4), (19, 4), (20, 4), (46, 4),
-- Books
(21, 5), (22, 5), (23, 5), (24, 5), (25, 5), (47, 5),
-- Toys & Games
(26, 6), (27, 6), (28, 6), (29, 6), (30, 6), (48, 6),
-- Beauty & Personal Care
(31, 7), (32, 7), (33, 7), (34, 7), (35, 7), (49, 7),
-- Food & Beverages
(36, 8), (37, 8), (38, 8), (39, 8), (40, 8), (50, 8),
-- Cross-category items
(12, 4),  -- Water Bottle -> Sports
(14, 1),  -- LED Desk Lamp -> Electronics
(22, 3),  -- Cookbook -> Home & Kitchen
(33, 3),  -- Diffuser -> Home & Kitchen
(16, 7);  -- Yoga Mat -> Beauty & Personal Care
