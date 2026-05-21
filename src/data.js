// Default places and itineraries for Wanderlaine.
// Loaded into localStorage on first visit. Editable via the Admin tab.

export const INIT_PLACES = [
  { id: "p1", name: "Sushi Masuda", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 5, tags: ["michelin-guide"], lat: 49.2634, lng: -123.1016, address: "Vancouver, BC", comment: "The Omakase ceiling of Vancouver. All ingredients air-shipped from Japan. Only 12 seats per night across two slots. Got Michelin one star in its first year. Fell in love with shirako here.", proTip: "Book on the 1st of each month via Tock — sells out in 5 min. Ask for less rice if small appetite.", photo: null },
  { id: "p2", name: "Sumibiyaki Arashi", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: [], lat: 49.2827, lng: -123.1207, address: "Vancouver, BC", comment: "Japanese yakitori — eating chicken head to toe, inside out. Fresh ingredients but as a Cantonese person felt something was missing. Under 10 seats. We were 30 min late from parking and still caught up fine.", proTip: "Opens bookings on the 1st — check their Instagram. ~$200/person.", photo: null },
  { id: "p3", name: "Published on Main", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 5, tags: ["top-50"], lat: 49.2537, lng: -123.1012, address: "Main St, Vancouver, BC", comment: "Booked two months ahead, then it landed on North America's Top 50. Small bites are incredible — want to order everything. Mains lean acidic but the Valley Duck is outstanding. Wine list design is gorgeous.", proTip: "Seaweed Sunday cocktail = green Bloody Mary. Birthday celebrations get special strawberry dessert.", photo: null },
  { id: "p4", name: "AnnaLena", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 5, tags: ["michelin-guide"], lat: 49.2639, lng: -123.1534, address: "1809 W 1st Ave, Vancouver, BC", comment: "Michelin one star — zero pretension. Handwritten wine list, colorful menu, wear flip-flops if you want. Eight courses, all exceptional without exception. Staff are adorable when describing dishes. Hardest reservation in Vancouver.", proTip: "Book at least 3 weeks ahead. Fills up before 6pm.", photo: null },
  { id: "p5", name: "PiDGiN", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 5, tags: [], lat: 49.2822, lng: -123.1032, address: "350 Carrall St, Vancouver, BC", comment: "Incredible atmosphere and setting. Foie gras rice is seasoned to perfection. Great cocktails too. Decision paralysis? Just get the set menu.", proTip: "Must-order: foie gras rice, pork belly rice, any dessert.", photo: null },
  { id: "p6", name: "Raisu", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 5, tags: [], lat: 49.266, lng: -123.1382, address: "Vancouver, BC", comment: "My Vancouver canteen — default when I can't decide. Lunch set is insane value: under $40 for two mains. Perfect for birthdays — they gift a dessert and take a Polaroid.", proTip: "Must-order: Crab & Uni Cream Udon, Grapefruit Crème Brûlée, Shokado Bento Box (pre-book).", photo: null },
  { id: "p7", name: "The Lunch Lady", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 5, tags: ["michelin-guide"], lat: 49.283, lng: -123.109, address: "Vancouver, BC", comment: "Following Michelin recommendations here is foolproof. Went twice and ordered almost everything — all delicious and surprisingly affordable.", proTip: "Must-order: Beef Carpaccio, Garlic Fried Noodles, Wagyu Beef Noodle Soup, Fried Soft Crab. Book ahead.", photo: null },
  { id: "p8", name: "Kingyo Izakaya", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: [], lat: 49.2886, lng: -123.1351, address: "Vancouver, BC", comment: "Good food. Lunch has a special bento limited to 8 portions. Crowded so service suffers. Close to Stanley Park — great post-walk stop.", proTip: "Must-order: Dandan Noodle.", photo: null },
  { id: "p9", name: "Sushi Hil", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: ["michelin-guide"], lat: 49.271, lng: -123.149, address: "Vancouver, BC", comment: "Tiny spot, ~20 seats. Michelin recommended — taste the quality. Tuna tasting and nigiri tasting both great. Basically omakase quality for less.", proTip: "Must-order: Tuna Tasting.", photo: null },
  { id: "p10", name: "Social Corner", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 5, tags: [], lat: 49.275, lng: -123.121, address: "Yaletown, Vancouver, BC", comment: "THE BEST foie gras burger in Vancouver. First bite — my partner and I stared at each other: 'can we come back next time?' Everything else amazing too. Wagyu Carpaccio, Lobster Ravioli (soak bread in sauce!), lamb Costolette.", proTip: "Must-order: THE BURGER (foie gras). Dinner ~$100+/person.", photo: null },
  { id: "p11", name: "Toyokan Bowl", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: [], lat: 49.281, lng: -123.11, address: "Vancouver, BC", comment: "Heaven for uni and sashimi lovers. 30 min wait on weekends. Rice and sashimi super fresh. Dessert and service average. Try Plaza Toyokan downstairs for cooked food and drinks.", proTip: "", photo: null },
  { id: "p12", name: "Prata-Man Singapore Cuisine", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: [], lat: 49.2455, lng: -123.031, address: "Vancouver, BC", comment: "A Cantonese free-range chicken that traveled to Singapore then ended up on a Canadian table. Better than Singapore's famous Boon Tong Kee!", proTip: "Must add spring onions!", photo: null },
  { id: "p13", name: "Hao Ji Lamb House", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: ["locals-favorite"], lat: 49.229, lng: -123.006, address: "Vancouver, BC", comment: "The lamb is genuinely incredible — fragrant, unforgettable. Every part of the lamb is delicious here.", proTip: "Try the lamb whip — tastes like spicy jerky. Seriously.", photo: null },
  { id: "p14", name: "TAKENAKA Uni Bar", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: [], lat: 49.283, lng: -123.105, address: "Vancouver, BC", comment: "Another paradise for uni/sashimi lovers. Special uni set available but I prefer à la carte. Quality can vary but was great when I went.", proTip: "", photo: null },
  { id: "p15", name: "Geng Shi Ji", country: "Canada", city: "Vancouver", category: "restaurant-bar", rating: 4, tags: [], lat: 49.276, lng: -123.12, address: "Vancouver, BC", comment: "Creative Chinese cuisine, great setting. Perfect for friend gatherings.", proTip: "Must-order: Smashed eggplant — I get takeaway every time.", photo: null },
  { id: "p16", name: "Eric Jane Restaurant", country: "Canada", city: "Kelowna", category: "restaurant-bar", rating: 5, tags: [], lat: 49.8863, lng: -119.496, address: "Downtown Kelowna, BC", comment: "Downtown spot with daily Happy Hour and different events. Waitress is adorable!", proTip: "", photo: null },
  { id: "p17", name: "Old Vines at Quail's Gate", country: "Canada", city: "Kelowna", category: "restaurant-bar", rating: 5, tags: [], lat: 49.864, lng: -119.554, address: "Quail's Gate Winery, Kelowna, BC", comment: "Winery restaurant that's delicious + beautiful + great wine. Order white/red wine flights. Waiter was hilarious.", proTip: "", photo: null },
  { id: "p18", name: "HUMO", country: "Canada", city: "Kelowna", category: "restaurant-bar", rating: 4, tags: [], lat: 49.885, lng: -119.495, address: "Okanagan Lake, Kelowna, BC", comment: "Lakeside restaurant — eat while watching sunset over the lake. Perfect for evening drinks.", proTip: "", photo: null },
  { id: "p19", name: "The Restaurant at Mission Hill", country: "Canada", city: "Kelowna", category: "restaurant-bar", rating: 5, tags: ["unique-experience"], lat: 49.856, lng: -119.519, address: "Mission Hill Winery, Kelowna, BC", comment: "Rating the restaurant higher than the wine tasting! Best salad and duck I've had in ages. Mountain-lake setting, outdoor dining, gorgeous.", proTip: "Lunch set with wine pairing = $70, walk-in. Way better than the $60 wine tasting.", photo: null },
  { id: "p20", name: "Karat Chocolate", country: "Canada", city: "Kelowna", category: "restaurant-bar", rating: 5, tags: [], lat: 49.8865, lng: -119.4958, address: "Kelowna, BC", comment: "Exquisite pastry boutique — chocolates and cakes almost too pretty to eat.", proTip: "Eat quickly — chocolate doesn't last in outdoor heat.", photo: null },
  { id: "p21", name: "The Kangaroo Farm", country: "Canada", city: "Kelowna", category: "activity", rating: 5, tags: ["unique-experience"], lat: 50.191, lng: -119.276, address: "Kelowna area, BC", comment: "Biggest surprise of the trip! Up-close animal interactions. CAPYBARAS! So many, so lazy, so adorable!", proTip: "", photo: null },
  { id: "p22", name: "Myra-Bellevue Provincial Park", country: "Canada", city: "Kelowna", category: "activity", rating: 5, tags: ["outdoor"], lat: 49.839, lng: -119.445, address: "Kelowna, BC", comment: "Cycling on abandoned railways through valleys. Beautiful 2-hour ride then head to town for food.", proTip: "", photo: null },
  { id: "p23", name: "Mission Hill Winery", country: "Canada", city: "Kelowna", category: "activity", rating: 5, tags: ["unique-experience"], lat: 49.856, lng: -119.519, address: "Mission Hill, Kelowna, BC", comment: "Stunning winery. Architecture is gorgeous — sit outdoors overlooking the lake. Wine tasting is decent but the restaurant is the real gem.", proTip: "Skip wine tasting ($60), go straight to lunch set ($70 with wine). Trust me.", photo: null },
  { id: "p24", name: "Soma Craft Cidery", country: "Canada", city: "Kelowna", category: "activity", rating: 4, tags: ["local-experience"], lat: 49.862, lng: -119.51, address: "Kelowna, BC", comment: "Cider winery — great change from grape wine. Live music every afternoon. Perfect for sunbathing, reading, chilling.", proTip: "", photo: null },
  { id: "p25", name: "Gorge's Cherries", country: "Canada", city: "Kelowna", category: "activity", rating: 5, tags: ["local-experience"], lat: 49.87, lng: -119.48, address: "Kelowna, BC", comment: "A super friendly farmer's cherry orchard. First time picking cherries — biggest I've ever seen. Eat while you pick! As the farmer says: 'It's a gift from mother nature.' $3/pound!", proTip: "30 min from downtown.", photo: null },
  { id: "p26", name: "Le Violon", country: "Canada", city: "Montreal", category: "restaurant-bar", rating: 5, tags: ["top-50"], lat: 45.523, lng: -73.5785, address: "Montreal, QC", comment: "Newly on North America Top 50. Cozy spot with clean, simple menu. First time trying Guinea Fowl — crispy skin! Lobster with leek & mayo is the star. Choux pastry with raspberry for dessert. Staff are incredibly warm and knowledgeable.", proTip: "Birthday = sparkler cake! Check the Michelin plaque on the wall as you leave.", photo: null },
  { id: "p27", name: "Mon Lapin", country: "Canada", city: "Montreal", category: "restaurant-bar", rating: 5, tags: ["top-50"], lat: 45.5235, lng: -73.563, address: "Montreal, QC", comment: "North America's #2 restaurant. The waiter elevated the whole experience. Rabbit decor everywhere! Ris de veau (sweetbreads) was a revelation. SAVE ROOM FOR DESSERTS — they're unbelievable.", proTip: "Must-try desserts: Sandwich Glacé, Tartelette au Miel, Gateau Sarrasin. Still packed at 10pm.", photo: null },
  { id: "p28", name: "Boulay", country: "Canada", city: "Quebec City", category: "restaurant-bar", rating: 5, tags: [], lat: 46.8139, lng: -71.2074, address: "Quebec City, QC", comment: "Perfect end to an autumn day in Quebec City. Beef cheek and duck confit are the moves. Pair with a stroll through old town.", proTip: "", photo: null },
  { id: "p29", name: "Garibaldi Lake", country: "Canada", city: "Vancouver", category: "activity", rating: 5, tags: ["outdoor"], lat: 49.934, lng: -123.162, address: "Garibaldi Provincial Park, BC", comment: "If you can't summit Panorama Ridge, do Garibaldi Lake. Forest trail — 20km round trip, 1000m elevation, 7.5 hours. Shaded the whole way.", proTip: "Bring sunscreen, snacks, bug spray. July: shorts and tee are fine.", photo: null },
  { id: "p30", name: "Joffre Lakes", country: "Canada", city: "Vancouver", category: "activity", rating: 5, tags: ["outdoor"], lat: 50.3495, lng: -122.4895, address: "Joffre Lakes Provincial Park, BC", comment: "Vancouver's most beautiful park. Easy 9km trail, ~5h with stops. Snowcapped mountains melting into turquoise lakes — snowy Jiuzhaigou vibes.", proTip: "Book day-use pass 2 days ahead at 7am — sells out instantly. Keep refreshing.", photo: null },
  { id: "p31", name: "Mount Nebo", country: "Jordan", city: "Madaba", category: "activity", rating: 4, tags: ["sightseeing"], lat: 31.7672, lng: 35.7253, address: "Mount Nebo, Jordan", comment: "Where Moses saw the Promised Land. Quick 1h stop en route to Dead Sea. The drive itself is gorgeous.", proTip: "", photo: null },
  { id: "p32", name: "Dead Sea", country: "Jordan", city: "Dead Sea", category: "activity", rating: 5, tags: ["unique-experience"], lat: 31.5, lng: 35.5, address: "Dead Sea, Jordan", comment: "Float at the lowest point on Earth — 424m below sea level. Surreal. Stay overnight for full chill vibes.", proTip: "Use hotel's private beach — cleaner and safer than public ones.", photo: null },
  { id: "p33", name: "Al-Maghtas", country: "Jordan", city: "Dead Sea", category: "activity", rating: 5, tags: ["sightseeing"], lat: 31.8372, lng: 35.5506, address: "Al-Maghtas, Jordan", comment: "Believed to be Jesus' baptism site. Jordan River separates you from Israel by just 2-3 meters. Standing on the 'West Bank' from the news. Worth the visit.", proTip: "Covered by Jordan Pass.", photo: null },
  { id: "p34", name: "Petra", country: "Jordan", city: "Petra", category: "activity", rating: 5, tags: ["unique-experience", "sightseeing"], lat: 30.3285, lng: 35.4444, address: "Petra, Jordan", comment: "The reason everyone comes to Jordan — New Seven Wonders. Full day (8h+). Hike or ride horses. Paid photo spots offer genuinely better angles. Petra by Night 4 days/week.", proTip: "Buy Jordan Pass before your trip — saves 40 JOD visa + includes Petra (50 JOD). Buy Petra by Night with day pass.", photo: null },
  { id: "p35", name: "Wadi Rum", country: "Jordan", city: "Wadi Rum", category: "activity", rating: 5, tags: ["unique-experience", "outdoor"], lat: 29.5759, lng: 35.4215, address: "Wadi Rum, Jordan", comment: "Mars-like desert — red sand, giant boulders, total silence. Sunset drive, bonfire camp, stargazing. Simple camps are magical — skip the Instagram bubble hotels.", proTip: "Wed/Sun 4pm: free train show via Jordan Pass. Airbnb camp: 16 JOD/pp all-inclusive. Jeep Tour: negotiate to 55 JOD for two.", photo: null },
  { id: "p36", name: "Aqaba", country: "Jordan", city: "Aqaba", category: "activity", rating: 4, tags: [], lat: 29.5267, lng: 35.0078, address: "Aqaba, Jordan", comment: "Perfect post-Petra chill. Resort vibes — Red Sea, sunshine, pools. Summer = snorkeling and boats.", proTip: "", photo: null },
  { id: "p37", name: "Amman", country: "Jordan", city: "Amman", category: "activity", rating: 4, tags: ["sightseeing"], lat: 31.9539, lng: 35.9106, address: "Amman, Jordan", comment: "Big-city wind-down after the adventure. Jordan Museum, Roman Theatre, Rainbow Street. Hilly like Chongqing — take Uber.", proTip: "Day-trip to Jerash if time allows — one of the best-preserved Roman cities.", photo: null },
  { id: "p38", name: "Strand Hotel", country: "Jordan", city: "Amman", category: "accommodation", rating: 4, tags: ["economical"], lat: 31.953, lng: 35.929, address: "Amman, Jordan", comment: "Great location for first/last night. Staff helped push-start our car unprompted and refused payment. ~¥600/night.", proTip: "", photo: null },
  { id: "p39", name: "Grand Hyatt Amman", country: "Jordan", city: "Amman", category: "accommodation", rating: 5, tags: ["hotel-type", "premium"], lat: 31.954, lng: 35.898, address: "Amman, Jordan", comment: "Globalist upgrade to suite. Room came with red wine and raw chocolate — so good I asked front desk to buy more and they gifted another box. Happy hour 6-8pm is excellent.", proTip: "Ask about the raw chocolate. Happy hour 6-8pm.", photo: null },
  { id: "p40", name: "Hilton Dead Sea Resort", country: "Jordan", city: "Dead Sea", category: "accommodation", rating: 5, tags: ["hotel-type", "premium"], lat: 31.529, lng: 35.574, address: "Dead Sea, Jordan", comment: "Private Dead Sea beach + mud spa. Lobby view instantly erases travel fatigue. Christmas Eve upgrade to suite. Live local singer at night.", proTip: "Private beach is cleaned and safer. Try negotiating for club/dinner perks.", photo: null },
  { id: "p41", name: "Petra Marriott Hotel", country: "Jordan", city: "Petra", category: "accommodation", rating: 5, tags: ["hotel-type", "premium"], lat: 30.335, lng: 35.452, address: "Petra, Jordan", comment: "Mountaintop location, incredible views. Staff secretly made a bear-shaped pancake at breakfast! Shuttle to Petra included.", proTip: "Arrive before dark for the sunset. ~¥1600/night.", photo: null },
  { id: "p42", name: "Hyatt Regency Aqaba Ayla", country: "Jordan", city: "Aqaba", category: "accommodation", rating: 5, tags: ["hotel-type", "premium"], lat: 29.509, lng: 35.037, address: "Ayla, Aqaba, Jordan", comment: "Favorite hotel of the entire Jordan trip. Ayla area is new and gorgeous. Sea-view pool, blue-white aesthetic, insanely photogenic. Upgraded to Regency Suite.", proTip: "In summer, stay multiple nights. ~¥1500/night.", photo: null },
  { id: "p43", name: "Chena Hot Springs", country: "USA", city: "Fairbanks", category: "activity", rating: 5, tags: ["unique-experience"], lat: 65.0524, lng: -146.0547, address: "Chena Hot Springs, AK", comment: "Soaking in hot springs surrounded by ice and snow — watch your hair freeze strand by strand. Not cold at all! Ice sculpture museum inside.", proTip: "Try the Apple Martini at the ice museum.", photo: null },
  { id: "p44", name: "Alaska Railroad Aurora Train", country: "USA", city: "Fairbanks", category: "activity", rating: 5, tags: ["unique-experience"], lat: 64.8378, lng: -147.7164, address: "Anchorage to Fairbanks, AK", comment: "12-hour scenic railway — 'world's most beautiful train line.' The scenery along the way is breathtaking.", proTip: "", photo: null },
  { id: "p45", name: "Dog Sledding Fairbanks", country: "USA", city: "Fairbanks", category: "activity", rating: 5, tags: ["unique-experience"], lat: 64.84, lng: -147.72, address: "Fairbanks, AK", comment: "The huskies are adorable, huge, and gorgeous! They run incredibly fast. Want to go again and again.", proTip: "", photo: null },
  { id: "p46", name: "Blue Ridge Parkway", country: "USA", city: "Virginia", category: "activity", rating: 5, tags: ["outdoor", "sightseeing"], lat: 35.7796, lng: -82.2653, address: "Blue Ridge Parkway, NC/VA", comment: "470 miles of America's most scenic autumn driving. Highlights: Linville Falls, Mabry Mill, Rough Ridge Lookout, Linn Cove Viaduct.", proTip: "Speed limit is very slow — use nearby highways if you need to make time. Download offline maps!", photo: null },
  { id: "p47", name: "Gatlinburg SkyLift Park", country: "USA", city: "Gatlinburg", category: "activity", rating: 4, tags: ["sightseeing"], lat: 35.7126, lng: -83.5182, address: "Gatlinburg, TN", comment: "Cable car up the mountain + sky bridge across the valley. Watch the town lights come alive at dusk. Lots of fun shops below.", proTip: "", photo: null },
  { id: "p48", name: "Great Smoky Mountains", country: "USA", city: "Gatlinburg", category: "activity", rating: 5, tags: ["outdoor"], lat: 35.6532, lng: -83.507, address: "Great Smoky Mountains NP, TN", comment: "Lives up to its name — genuinely misty and ethereal. Like driving through Mulholland Drive.", proTip: "", photo: null },
  { id: "p49", name: "Me & My Roro", country: "Malaysia", city: "Johor Bahru", category: "restaurant-bar", rating: 5, tags: ["locals-favorite"], lat: 1.5418, lng: 103.7511, address: "Johor Bahru, Malaysia", comment: "My #1 in JB. Late-night Japanese spot open until 2-3am. Food is delicious and the lychee martini is incredible. Way better value than overpriced omakase elsewhere.", proTip: "", photo: null },
  { id: "p50", name: "Grand Bayview Seafood", country: "Malaysia", city: "Johor Bahru", category: "restaurant-bar", rating: 5, tags: ["locals-favorite"], lat: 1.463, lng: 103.725, address: "Johor Bahru, Malaysia", comment: "100 SGD per person gets you incredible ocean views + live Australian lobster sashimi (still moving on the plate!). Jumbo crab and XO geoduck are amazing.", proTip: "", photo: null },
  { id: "p51", name: "Imperial Duck", country: "Malaysia", city: "Johor Bahru", category: "restaurant-bar", rating: 5, tags: ["locals-favorite"], lat: 1.534, lng: 103.744, address: "Johor Bahru, Malaysia", comment: "Best roast meats in JB. So good I buy their frozen char siu every trip to cook at home in Singapore.", proTip: "", photo: null },
  { id: "p52", name: "Soup Master", country: "Malaysia", city: "Johor Bahru", category: "restaurant-bar", rating: 5, tags: ["locals-favorite"], lat: 1.535, lng: 103.745, address: "Johor Bahru, Malaysia", comment: "The one place I eat at every single JB visit. Cantonese-style nourishing soups and rice. Knife-cut noodles and braised pork sesame buns are my favorites.", proTip: "", photo: null },
  { id: "p53", name: "Oriental Kopi", country: "Malaysia", city: "Johor Bahru", category: "restaurant-bar", rating: 4, tags: [], lat: 1.533, lng: 103.746, address: "Johor Bahru, Malaysia", comment: "Traditional Nanyang cuisine. Famous so always tempting, but skip it if there's a queue. The egg tart is worth buying even if you don't stay.", proTip: "If queuing, just grab an egg tart to go — eat it hot!", photo: null },
  { id: "p54", name: "Dab Hand Coffee", country: "Malaysia", city: "Johor Bahru", category: "restaurant-bar", rating: 4, tags: [], lat: 1.538, lng: 103.749, address: "Johor Bahru, Malaysia", comment: "Perfect for a quiet afternoon of reading or work. All-day brunch is solid. Has power outlets!", proTip: "", photo: null },
  { id: "p55", name: "Space Cafe", country: "Malaysia", city: "Johor Bahru", category: "restaurant-bar", rating: 4, tags: [], lat: 1.537, lng: 103.748, address: "Johor Bahru, Malaysia", comment: "Blew me away on first visit. Green grape cold brew and latte are amazing. Small tables — best for afternoon tea with friends.", proTip: "", photo: null },
  { id: "p56", name: "Chun K Karaoke", country: "Malaysia", city: "Johor Bahru", category: "activity", rating: 5, tags: ["local-experience"], lat: 1.5624, lng: 103.7774, address: "Austin Heights, Johor Bahru, Malaysia", comment: "Huge song selection in both Chinese and English. Amazing acoustic system. Great for post-dinner fun — food delivery available too.", proTip: "", photo: null },
  { id: "p57", name: "The Backdrop", country: "Singapore", city: "Singapore", category: "restaurant-bar", rating: 5, tags: ["unique-experience"], lat: 1.283, lng: 103.849, address: "Singapore", comment: "My absolute favorite bar in SG. Hidden in a hotel lobby — I've walked past it multiple times without finding the entrance. Inside feels like stepping into Midnight in Paris. Vintage decor, quirky collections, Dancing Queen playing. Bartender asked why I was dancing — I said I love your music.", proTip: "Book a late-night slot. They give first-date couples a question card for icebreaking.", photo: null },
  { id: "p58", name: "Bar Bon Funk", country: "Singapore", city: "Singapore", category: "restaurant-bar", rating: 5, tags: [], lat: 1.328, lng: 103.852, address: "New Bahru, Singapore", comment: "More of an art gallery that serves drinks. Walk past cute artisan shops on the way. Food portions are small — great as bar snacks. Cocktails are excellent. Casual but not loud.", proTip: "Book ahead or you'll be turned away! Eat at a restaurant downstairs first, then come up for drinks.", photo: null },
  { id: "p59", name: "Zén", country: "Singapore", city: "Singapore", category: "restaurant-bar", rating: 5, tags: ["michelin-guide"], lat: 1.28, lng: 103.844, address: "Singapore", comment: "Singapore's #1 fine dining experience. Unassuming 3-story house. Cocktails and snacks on floor 1, main courses on floor 2, dessert and rare wines on floor 3. Exit via internal elevator saying goodbye to staff. Nordic cuisine — all seafood dishes were incredible.", proTip: "If choosing one SG fine dining: pick Zén over Odette. Even the lunch set left me stuffed. $600+/pp without wine.", photo: null },
  { id: "p60", name: "Maido", country: "Peru", city: "Lima", category: "restaurant-bar", rating: 5, tags: ["top-50"], lat: -12.1092, lng: -77.037, address: "Lima, Peru", comment: "Hard to imagine the world's #1 restaurant is a Japanese restaurant in Peru — until you learn about Peru's Japanese immigrant history. Nikkei fusion. Lucky walk-in at 3pm after months of failed bookings. Every dish was delicious thanks to the Japanese base. ~$250/pp.", proTip: "Try walk-in around 3pm for cancellation spots.", photo: null },
  { id: "p61", name: "Central", country: "Peru", city: "Lima", category: "restaurant-bar", rating: 5, tags: ["top-50"], lat: -12.1525, lng: -77.0225, address: "Lima, Peru", comment: "World #1 in 2023. No Michelin stars but #1 on World's 50 Best. All ingredients sourced from across South America. Enormous tables — only 6 in the restaurant, more chefs than diners. Plating and service are extraordinary. Peruvian cuisine leans sour/salty. Dessert with coffee pairings was the highlight.", proTip: "Order only 1 wine pairing per 2 people — glasses pile up fast. ~$600+/pp with wine.", photo: null },
  { id: "p62", name: "Restaurant Tim Raue", country: "Germany", city: "Berlin", category: "restaurant-bar", rating: 2, tags: ["michelin-guide"], lat: 52.507, lng: 13.3905, address: "Berlin, Germany", comment: "Michelin two-star Chinese-Japanese-Thai fusion near Checkpoint Charlie. As a Chinese person: worse than street-side Shaxian snacks. The chopsticks were unusable, found hair in a dish (no apology), water glass never refilled after dessert. Only redeeming quality: convenient location. ~300€/pp without wine.", proTip: "Don't. Just eat bratwurst and pork knuckle instead.", photo: null },
  { id: "p63", name: "Nobelhart & Schmutzig", country: "Germany", city: "Berlin", category: "restaurant-bar", rating: 5, tags: ["michelin-guide", "unique-experience"], lat: 52.5063, lng: 13.3935, address: "Berlin, Germany", comment: "The most unique Michelin one-star. Everyone sits around the open kitchen — no separate tables. No phones or photos allowed. They give solo diners books and seat you next to other solos. I spent the evening discussing WWII to Berlin Wall history with a German man. Uses only German local ingredients — 5 of 6 courses were entirely vegan. The experience matters more than the food.", proTip: "Student deal: 100€ for set menu + free-flow beverage pairing. One of a kind.", photo: null },
  { id: "p64", name: "Leo", country: "Colombia", city: "Bogota", category: "restaurant-bar", rating: 4, tags: ["top-50"], lat: 4.644, lng: -74.056, address: "Bogota, Colombia", comment: "Colombia's #1 restaurant with a female head chef. Uses wild local ingredients including ants for flavor (ant acid as seasoning). 'The best Colombian cuisine with weird and wonderful ingredients.' 6 or 8 courses — small eaters choose 6. ~$200/pp.", proTip: "Tell them your allergies upfront — they use insects in many dishes.", photo: null },
  { id: "p65", name: "Sublime", country: "Guatemala", city: "Guatemala City", category: "restaurant-bar", rating: 4, tags: ["top-50"], lat: 14.61, lng: -90.509, address: "Guatemala City, Guatemala", comment: "Guatemala's only restaurant on Latin America's Top 50. All dishes use unique local ingredients I'd never seen before — a real food journey. Rare to find both mocktail AND cocktail pairing. ~$150/pp with drinks.", proTip: "Order one cocktail pairing and one mocktail pairing to share — you get 6 drinks each.", photo: null },
  { id: "p66", name: "De La Gente Coffee Tour", country: "Guatemala", city: "Antigua", category: "activity", rating: 5, tags: ["local-experience"], lat: 14.5586, lng: -90.7295, address: "Antigua, Guatemala", comment: "NGO-run artisan coffee tour. Visit a different farmer's home each time. Hand-roast, hand-grind, hand-brew coffee. The biscuits are so good we bought more.", proTip: "Add the lunch option — eating and chatting at the farmer's home is the highlight.", photo: null },
  { id: "p67", name: "Acatenango Volcano Hike", country: "Guatemala", city: "Antigua", category: "activity", rating: 5, tags: ["outdoor", "unique-experience"], lat: 14.501, lng: -90.876, address: "Antigua, Guatemala", comment: "2-day volcano trek. Option to pay for a car ride up 80% (recommended — save energy for the summit). Base camp at night: bonfire, hot cocoa, marshmallows, watching Fuego erupt nearby. 3:45am summit push for sunrise + eruption + cloud sea trifecta.", proTip: "Choose Wicho & Charlie's. Bring wet wipes, 3L water, trail mix. Skip bringing extra food — it adds weight.", photo: null },
  { id: "p68", name: "Park Hyatt Siem Reap", country: "Cambodia", city: "Siem Reap", category: "accommodation", rating: 5, tags: ["hotel-type", "premium"], lat: 13.36, lng: 103.86, address: "Siem Reap, Cambodia", comment: "Would return to Angkor Wat just to stay here again. Cooking class with the head chef (he bought us off-menu fruits at the market!). Rice Wine Tour = tuk-tuk to distillery, make cocktails at sunset beach. Breakfast: local vendors on-site, Khmer coffee, 10-min massage. Evening fire ceremony + traditional dance.", proTip: "Do both the Cooking Class and Rice Wine Tour. Try EVERY breakfast item across two mornings. French Toast is the sweet MVP.", photo: null },
  { id: "p69", name: "Angkor Wat", country: "Cambodia", city: "Siem Reap", category: "activity", rating: 5, tags: ["sightseeing", "unique-experience"], lat: 13.4125, lng: 103.867, address: "Angkor Wat, Siem Reap, Cambodia", comment: "Go for sunrise — essential. Search for the 2000 Apsara carvings. The most beautiful and best temple to explore in the whole complex.", proTip: "Arrive early for sunrise. Combine with small/big circuit tours.", photo: null },
  { id: "p70", name: "Ta Prohm", country: "Cambodia", city: "Siem Reap", category: "activity", rating: 5, tags: ["sightseeing"], lat: 13.4346, lng: 103.8893, address: "Siem Reap, Cambodia", comment: "The temple consumed by giant trees — nature reclaiming ruins. Instantly recognizable and unforgettable.", proTip: "", photo: null },
  { id: "p71", name: "Banteay Srei", country: "Cambodia", city: "Siem Reap", category: "activity", rating: 5, tags: ["sightseeing"], lat: 13.5979, lng: 103.9622, address: "Siem Reap, Cambodia", comment: "The 'Jewel of Khmer Art' — finest carvings of all Angkor sites. Gifted to a royal teacher, dedicated to Shiva. Could spend 2-3 hours admiring the reliefs. Read Chiang Hsun's 'Beauty of Angkor' for context.", proTip: "Part of the outer circuit. Fewer tourists — take your time.", photo: null },
  { id: "p72", name: "Beng Mealea", country: "Cambodia", city: "Siem Reap", category: "activity", rating: 5, tags: ["sightseeing", "unique-experience"], lat: 13.587, lng: 104.071, address: "Siem Reap, Cambodia", comment: "Speechless. Like discovering a lost world — Temple Run in real life. Once completely submerged in water, now a jungle ruin. Hard to imagine how stunning this would be in rainy season.", proTip: "Outer circuit — hire a car (45-80 USD/day) and nap between sites.", photo: null },
  { id: "p73", name: "Chanrey Tree", country: "Cambodia", city: "Siem Reap", category: "restaurant-bar", rating: 4, tags: [], lat: 13.353, lng: 103.856, address: "Siem Reap, Cambodia", comment: "Curry fish and roast beef are great. ~$30/pp with nice ambiance.", proTip: "", photo: null },
  { id: "p74", name: "Kroya by Chef Chanrith", country: "Cambodia", city: "Siem Reap", category: "restaurant-bar", rating: 4, tags: [], lat: 13.354, lng: 103.857, address: "Siem Reap, Cambodia", comment: "6-course set menu — food is genuinely delicious but service was notably poor. ~$75/pp.", proTip: "", photo: null },
  { id: "p75", name: "The Jane", country: "Belgium", city: "Antwerp", category: "restaurant-bar", rating: 5, tags: ["michelin-guide", "unique-experience"], lat: 51.219, lng: 4.403, address: "Antwerp, Belgium", comment: "Converted military hospital — one of the world's most beautiful restaurants. Seafood-focused. The signature lobster has never left the menu — so good I soaked up every drop of sauce with bread. Staff said they eat the leftover sauce themselves. Cocktails mixed tableside from a rolling cart. Ate for 4 hours straight. Best food of any fine dining I've been to. Michelin 2 stars is too few — give it 3!", proTip: "Book 2 months ahead. Don't skip dessert — but if you're too full, they'll pack it to go with a gift and business card.", photo: null },
  { id: "p76", name: "Steirereck", country: "Austria", city: "Vienna", category: "restaurant-bar", rating: 5, tags: ["top-50", "michelin-guide"], lat: 48.204, lng: 16.381, address: "Vienna, Austria", comment: "Perennial World's Top 50. Trained from Prague just for this lunch. Solo diners get window seats with park views. Rare choice between tasting menu and à la carte. Amazing bread/cheese/tea trolleys. Christmas special vanillekipferl dessert served with a snow globe. Michelin 3-star quality at 225€ for 6 courses — a steal for Vienna.", proTip: "", photo: null },
  { id: "p77", name: "Tresind Studio", country: "UAE", city: "Dubai", category: "restaurant-bar", rating: 5, tags: ["top-50", "unique-experience"], lat: 25.113, lng: 55.138, address: "Palm Jumeirah, Dubai", comment: "World #13 — an Indian fine dining that ranks in my top 3 ever. Only 6pm and 9pm seatings. Each course from a different Indian region — mountains to desert, ocean to plains. Mid-meal traditional ceremony is unforgettable. They knew it was our birthday and had an artist paint us a portrait during dinner. Everyone said happy birthday as we left.", proTip: "Arrive early — you'll wait. Don't like a cocktail? They'll swap it without asking.", photo: null },
  { id: "p78", name: "Pujol", country: "Mexico", city: "Mexico City", category: "restaurant-bar", rating: 5, tags: ["michelin-guide", "top-50"], lat: 19.432, lng: -99.195, address: "Mexico City, Mexico", comment: "Michelin 2-star with the famous 3615-day-old mole madre paired alongside fresh mole nuevo — tasting 10 years vs 1 year side by side. A tribute to Mexican culinary history. The Taco Omakase is wild. Beautiful setting compared to Quintonil.", proTip: "Book dinner 2 months ahead. ~$200/pp without wine.", photo: null },
  { id: "p79", name: "Quintonil", country: "Mexico", city: "Mexico City", category: "restaurant-bar", rating: 4, tags: ["michelin-guide", "top-50"], lat: 19.431, lng: -99.189, address: "Mexico City, Mexico", comment: "Michelin 2-star, World #7. Offers insect-based tacos including mantis and ants. I asked to skip insects and got substitutes. If you want the normal tasting menu, book a table not counter.", proTip: "Tell them upfront: no insects. ~$240/pp without wine.", photo: null },
  { id: "p80", name: "Sühring", country: "Thailand", city: "Bangkok", category: "restaurant-bar", rating: 4, tags: ["top-50"], lat: 13.721, lng: 100.536, address: "Bangkok, Thailand", comment: "German fine dining in a Bangkok villa garden. World #23, Asia #7. The beer-like appetizer and foie gras waffle crisp were creative highlights. Other courses weren't super memorable — German food struggles against Southeast Asian flavors. Great service and setting though.", proTip: "~400 SGD/pp with one cocktail. Good for dates or celebrations.", photo: null },
  { id: "p81", name: "Ledu", country: "Thailand", city: "Bangkok", category: "restaurant-bar", rating: 5, tags: ["top-50"], lat: 13.719, lng: 100.529, address: "Bangkok, Thailand", comment: "Asia's #1 in 2023, consistently World Top 50. Seasonal menus (rain/winter/summer) with matching restaurant decor. Southeast Asian dishes — incredibly aromatic and delicious. The non-alcoholic pairing is outstanding.", proTip: "Two people: order 4-course each with different dishes to share. ~1000 THB/pp total with pairing. Easy to book.", photo: null },
  { id: "p82", name: "The Clove Club", country: "UK", city: "London", category: "restaurant-bar", rating: 4, tags: ["michelin-guide"], lat: 51.5265, lng: -0.0825, address: "London, UK", comment: "Good choice if you must try British cuisine — actual modern British cooking beyond beans and fish & chips. Chef trained at Noma and The Ledbury. Open kitchen setup. One dish was essentially Cantonese soup — my friend and I both exclaimed 'this is just Guangdong tang!' Best dish of the night. ~200 GBP/pp.", proTip: "", photo: null },
  { id: "p83", name: "Grand Hyatt Muscat", country: "Oman", city: "Muscat", category: "accommodation", rating: 5, tags: ["hotel-type", "premium"], lat: 23.588, lng: 58.419, address: "Muscat, Oman", comment: "Incredible hospitality from doorman to front desk to every staff member. They remembered what we'd said and wished us a safe trip back to the US on checkout. System error led to an upgrade, and the manager gave us club access as apology (the club food is great!).", proTip: "", photo: null },
  { id: "p84", name: "Bun Alhisn Coffee", country: "Oman", city: "Nizwa", category: "restaurant-bar", rating: 5, tags: ["unique-experience"], lat: 23.03, lng: 57.54, address: "Mountains near Nizwa, Oman", comment: "Our Omani guide's recommendation. 1-hour drive up steep mountain roads from Nizwa. The passionfruit cold brew was the best coffee I've had in ages.", proTip: "", photo: null },
  { id: "p85", name: "Wadi Shab", country: "Oman", city: "Sur", category: "activity", rating: 5, tags: ["outdoor"], lat: 23.036, lng: 59.236, address: "Wadi Shab, Oman", comment: "Beautiful canyon hike with swimming. Combine with the nearby Bimmah Sinkhole on the same day.", proTip: "Between Muscat and Sur — do both Sinkhole and Wadi Shab in one day.", photo: null },
  { id: "p86", name: "Jabal Akhdar", country: "Oman", city: "Nizwa", category: "activity", rating: 5, tags: ["outdoor", "sightseeing"], lat: 23.2075, lng: 57.661, address: "Jabal Akhdar, Oman", comment: "Green Mountain with stunning views. Stay one night at a mountain hotel — the scenery is gorgeous. Great hiking.", proTip: "Drive from Nizwa or Muscat, both close by.", photo: null },
  { id: "p87", name: "Lu Cai", country: "China", city: "Shanghai", category: "restaurant-bar", rating: 5, tags: ["locals-favorite"], lat: 31.22, lng: 121.474, address: "Xintiandi, Shanghai, China", comment: "The Shandong cuisine ceiling in Shanghai. Black Pearl listed. Went with my boyfriend to try his hometown cuisine. Ordered the 1588 set — too much food by halfway through. Every single dish was delicious without exception.", proTip: "Smaller appetites should order the 988 set. Highly recommended for southerners who've never tried Shandong cuisine.", photo: null },
  { id: "p88", name: "Aura Skypool", country: "UAE", city: "Dubai", category: "activity", rating: 4, tags: ["unique-experience"], lat: 25.119, lng: 55.138, address: "Palm Jumeirah, Dubai", comment: "Infinity pool on Palm Jumeirah — stunning views. Book the lunch set or afternoon tea if you want to save money (can't swim but can enjoy the view).", proTip: "", photo: null }
];

// Each Chapter = a city or country. All sections (description, memory, itinerary, gallery) are optional.
export const INIT_STORIES = [
  {
    id: "st1",
    title: "Jordan",
    country: "Jordan",
    city: "",
    coverPhoto: null,
    description: "",
    memory: "",
    itinerary: {
      title: "7 Day Self-Drive",
      tagline: "Self-driving through ancient wonders, desert camps, and Dead Sea floating. Two girls, one rental car, unforgettable memories.",
      days: [
        { day: 1, title: "Arrive in Amman", notes: "Land at 11pm. Pick up rental car (Budget, ~200 RMB/day, buy full insurance). Check into Strand Hotel." },
        { day: 2, title: "Mount Nebo → Dead Sea", notes: "Drive to Mount Nebo (1h stop). Check into Hilton Dead Sea — private beach + mud spa. Visit Al-Maghtas (Jesus baptism site)." },
        { day: 3, title: "Dead Sea → Petra", notes: "Morning floating + mud bath at hotel. Drive through Madaba (mosaic city). Check into Petra Marriott." },
        { day: 4, title: "Petra Full Day", notes: "Full day exploring Petra (8h). Hike or ride horses. Petra by Night available 4 days/week. Drive to Aqaba." },
        { day: 5, title: "Aqaba → Wadi Rum", notes: "Morning at Hyatt Regency resort pool. Afternoon drive into Wadi Rum desert for sunset. Sleep at Airbnb camp (16 JOD/pp)." },
        { day: 6, title: "Wadi Rum → Amman", notes: "4-hour Jeep tour (55 JOD for two). Wed/Sun: catch the 4pm mini-train show. Drive back to Amman, check into Grand Hyatt." },
        { day: 7, title: "Amman City Day", notes: "Jordan Museum, Roman Theatre, Rainbow Street. Take Uber — the city is hilly. Optional: day trip to Jerash." },
        { day: 8, title: "Departure", notes: "Fly out to next destination. Return rental car at airport (2h grace period)." }
      ]
    },
    gallery: []
  },
  {
    id: "st2",
    title: "Alaska",
    country: "USA",
    city: "Fairbanks",
    coverPhoto: null,
    description: "",
    memory: "",
    itinerary: {
      title: "5 Day Northern Lights",
      tagline: "Chasing the aurora borealis, soaking in hot springs with frozen hair, and hugging sled dogs in Fairbanks.",
      days: [
        { day: 1, title: "LAX → Anchorage", notes: "Fly in. Visit Anchorage Museum. Optional: glacier hiking for blue ice." },
        { day: 2, title: "Aurora Train to Fairbanks", notes: "12-hour Alaska Railroad scenic journey — 'world's most beautiful train line.' Stunning mountain and wilderness views." },
        { day: 3, title: "Fairbanks Adventures", notes: "Choose: Arctic Circle sign photo trip, OR Chena Hot Springs (strongly recommended — hot spring in snow, ice museum, Apple Martini)." },
        { day: 4, title: "Dogs & Northern Lights", notes: "Dog sledding + snowmobiles by day. Chase aurora at night — check gi.alaska.edu/monitors/aurora-forecast. Tip: visible aurora is subtler than photos." },
        { day: 5, title: "Santa's House → LAX", notes: "Morning visit to North Pole / Santa Claus House (commercial but fun). Fly home." }
      ]
    },
    gallery: []
  },
  {
    id: "st3",
    title: "Blue Ridge & Smoky Mountains",
    country: "USA",
    city: "",
    coverPhoto: null,
    description: "",
    memory: "",
    itinerary: {
      title: "5 Day Road Trip",
      tagline: "Autumn leaf-peeping from Shenandoah to the Great Smokies. 470 miles of America's most scenic drive.",
      days: [
        { day: 1, title: "Virginia → Roanoke", notes: "Depart Virginia early, 5h drive to Blue Ridge Parkway start. Stay in Roanoke." },
        { day: 2, title: "Blue Ridge Parkway", notes: "Leisurely 6h scenic drive to Asheville. Stops: Mabry Mill, Linville Falls, Rough Ridge Lookout, Linn Cove Viaduct." },
        { day: 3, title: "Gatlinburg", notes: "1.5h drive to Gatlinburg. SkyLift Park cable car + sky bridge. Watch town lights come alive at dusk. Explore the strip." },
        { day: 4, title: "Great Smoky Mountains", notes: "Full day in the park. Truly misty and ethereal — like driving in a movie." },
        { day: 5, title: "Drive Home", notes: "Breakfast then 9h drive back. Tip: Pancake Pantry is famous brunch but expect long lines." }
      ]
    },
    gallery: []
  },
  {
    id: "st4",
    title: "Siem Reap",
    country: "Cambodia",
    city: "Siem Reap",
    coverPhoto: null,
    description: "",
    memory: "",
    itinerary: {
      title: "Angkor Wat — 4 Days",
      tagline: "Ancient temples, sunrise silhouettes, cooking classes, and rice wine cocktails at the Park Hyatt.",
      days: [
        { day: 1, title: "Arrive in Siem Reap", notes: "Fly in (2h from Singapore). Hotel cooking class or activities. Old Market for souvenirs. Dinner at hotel with Khmer dance performance." },
        { day: 2, title: "Small Circuit", notes: "4:30am departure for Angkor Wat sunrise. Return for hotel breakfast. Small circuit: Bayon (108 smiles), Baphuon, Elephant Terrace, Ta Prohm (tree temple). Afternoon: hotel Rice Wine Tour." },
        { day: 3, title: "Angkor Wat + Sunset", notes: "Explore Angkor Wat in detail — find the 2000 Apsara carvings. Evening: Phnom Bakheng for sunset (20 min hike up, 1h+ queue)." },
        { day: 4, title: "Outer Circuit", notes: "Hire a car (AC for napping between sites). Banteay Srei (finest carvings), Beng Mealea (jungle ruins — the highlight!), Roluos Group." }
      ]
    },
    gallery: []
  },
  {
    id: "st5",
    title: "Dubai",
    country: "UAE",
    city: "Dubai",
    coverPhoto: null,
    description: "",
    memory: "",
    itinerary: {
      title: "3 Days No Early Mornings",
      tagline: "Palm Jumeirah sunsets, Burj Khalifa views, and the world's #13 restaurant — all without an alarm clock.",
      days: [
        { day: 1, title: "Arrive + Palm Jumeirah", notes: "Land in Dubai. Afternoon: Palm Jumeirah + Aura Skypool (book lunch set to save). Sunset views. Dinner at Tresind Studio (book 9pm seating)." },
        { day: 2, title: "Icons", notes: "Burj Al Arab (gold-leaf coffee at rooftop). Golden Frame at sunset (1h+ queue). Dubai Mall shopping. Burj Khalifa observation deck (pre-book online)." },
        { day: 3, title: "Old Dubai", notes: "Al Seef old district — best for photos. Walk from Creek Park Pier along the river toward old center. Afternoon: boat ride." }
      ]
    },
    gallery: []
  },
  {
    id: "st6",
    title: "Oman",
    country: "Oman",
    city: "",
    coverPhoto: null,
    description: "",
    memory: "",
    itinerary: {
      title: "6 Day Self-Drive",
      tagline: "Dolphin watching, canyon swimming, mountain coffee shops, and the friendliest people you'll ever meet.",
      days: [
        { day: 1, title: "Muscat", notes: "Explore forts and Sultan Qaboos Grand Mosque. Check into Grand Hyatt Muscat." },
        { day: 2, title: "Dolphins + Bahla Fort", notes: "Morning dolphin watching tour. Drive to Bahla Fort (UNESCO)." },
        { day: 3, title: "Sinkhole + Wadi Shab + Sur", notes: "Bimmah Sinkhole. Wadi Shab canyon hike + swim. Drive to Sur for sunset from the fort. Evening: turtle reserve." },
        { day: 4, title: "Nizwa", notes: "Drive to Nizwa. Explore the fort. If lucky, catch local events. Browse the souq (bring cash!)." },
        { day: 5, title: "Green Mountain", notes: "Nizwa souq morning. Drive up to Bun Alhisn mountain coffee shop. Continue to Jabal Akhdar — hike with stunning views. Stay overnight on the mountain." },
        { day: 6, title: "Departure", notes: "Morning hotel activities. Drive down to Muscat airport." }
      ]
    },
    gallery: []
  },
  {
    id: "st7",
    title: "Antigua",
    country: "Guatemala",
    city: "Antigua",
    coverPhoto: null,
    description: "",
    memory: "",
    itinerary: {
      title: "Volcanoes & Coffee — 5 Days",
      tagline: "Volcano trekking, coffee farm tours, and Latin America's finest dining — backpacker paradise.",
      days: [
        { day: 1, title: "Arrive in Antigua", notes: "Fly to Guatemala City, taxi/Uber to Antigua (~1h, 300Q). Settle in. Evening: explore cobblestone streets." },
        { day: 2, title: "Coffee Tour + Town", notes: "Morning: De La Gente coffee tour (add lunch at farmer's home). Afternoon: explore Antigua. Dinner: La Casa de las Sopas (beef soup is legendary)." },
        { day: 3, title: "Acatenango Volcano Day 1", notes: "6:30am meetup at Wicho & Charlie's. Rent gear, eat breakfast. Choose car ride up 80%. Hike to base camp. Optional: summit Fuego (4-9pm, extremely tough). Campfire, hot cocoa, watch eruptions." },
        { day: 4, title: "Volcano Summit + Return", notes: "3:45am summit push for sunrise + eruption + cloud sea. Breakfast at camp. Hike down by 11am. Rest in Antigua." },
        { day: 5, title: "Lake Atitlán or Departure", notes: "Shuttle to Lake Atitlán (18 USD, recommended) or explore more of Antigua. Dinner: Sublime if in Guatemala City." }
      ]
    },
    gallery: []
  }
];
