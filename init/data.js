const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "nothing"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Mountain View Cabin",
    description:
      "Secluded cabin in the mountains, perfect for a peaceful retreat surrounded by nature.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
      filename: "mountain_cabin"
    },
    price: 1200,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Modern City Loft",
    description:
      "Sleek and stylish loft in the heart of the city, with high ceilings and open-plan living.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
      filename: "city_loft"
    },
    price: 2000,
    location: "New York",
    country: "United States",
  },
  {
    title: "Rustic Farmhouse",
    description:
      "Beautiful farmhouse set on a working ranch. Perfect for a family getaway.",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
      filename: "farmhouse"
    },
    price: 1000,
    location: "Nashville",
    country: "United States",
  },
  {
    title: "Luxury Villa with Pool",
    description:
      "Enjoy luxury living in this spacious villa with a private pool and lush gardens.",
    image: {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
      filename: "luxury_villa"
    },
    price: 5000,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Charming Countryside Cottage",
    description:
      "Quaint cottage surrounded by rolling hills and peaceful landscapes.",
    image: {
      url: "https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?auto=format&fit=crop&w=800&q=60",
      filename: "countryside_cottage"
    },
    price: 800,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Bohemian Beach Bungalow",
    description:
      "Colorful bungalow with boho-chic decor, steps away from the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "beach_bungalow"
    },
    price: 1300,
    location: "Tulum",
    country: "Mexico",
  },
  {
    title: "Scandinavian-style Apartment",
    description:
      "Bright and airy apartment with minimalist Scandinavian design.",
    image: {
      url: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=800&q=60",
      filename: "scandi_apartment"
    },
    price: 1800,
    location: "Stockholm",
    country: "Sweden",
  },
  {
    title: "Cozy Ski Chalet",
    description:
      "Warm and inviting chalet located right on the ski slopes.",
    image: {
      url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
      filename: "ski_chalet"
    },
    price: 2200,
    location: "Chamonix",
    country: "France",
  },
  {
    title: "Urban Studio Flat",
    description:
      "Compact and efficient studio flat perfect for solo travelers.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
      filename: "studio_flat"
    },
    price: 900,
    location: "Berlin",
    country: "Germany",
  },
  {
    title: "Eco-friendly Treehouse",
    description:
      "Unique treehouse built with sustainable materials, high among the canopy.",
    image: {
      url: "https://images.unsplash.com/photo-1533777324565-a040eb52fac2?auto=format&fit=crop&w=800&q=60",
      filename: "treehouse"
    },
    price: 1600,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "Desert Retreat Villa",
    description:
      "Peaceful villa surrounded by desert landscape and starry skies.",
    image: {
      url: "https://images.unsplash.com/photo-1508264165352-258a6ee5928c?auto=format&fit=crop&w=800&q=60",
      filename: "desert_villa"
    },
    price: 2400,
    location: "Palm Springs",
    country: "United States",
  },
  {
    title: "Historic Castle Stay",
    description:
      "Live like royalty in this medieval castle with modern amenities.",
    image: {
      url: "https://images.unsplash.com/photo-1508051123996-69f8caf4891e?auto=format&fit=crop&w=800&q=60",
      filename: "castle_stay"
    },
    price: 7000,
    location: "Edinburgh",
    country: "United Kingdom",
  },
  {
    title: "Lakefront Log Cabin",
    description:
      "Rustic log cabin right on the lake, with a private dock.",
    image: {
      url: "https://images.unsplash.com/photo-1473951296481-73b7e964a9f3?auto=format&fit=crop&w=800&q=60",
      filename: "log_cabin"
    },
    price: 1400,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Rainforest Lodge",
    description:
      "Immerse yourself in the rainforest in this luxurious eco-lodge.",
    image: {
      url: "https://images.unsplash.com/photo-1504198266280-5c6efe6df28e?auto=format&fit=crop&w=800&q=60",
      filename: "rainforest_lodge"
    },
    price: 2000,
    location: "Amazon",
    country: "Brazil",
  },
  {
    title: "Minimalist Apartment",
    description:
      "Simple, clean and functional apartment in the city center.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
      filename: "minimalist_apartment"
    },
    price: 1100,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Coastal Mediterranean Home",
    description:
      "Sunny Mediterranean-style home with sea views and olive trees.",
    image: {
      url: "https://images.unsplash.com/photo-1505691723518-36a9eb3e5c87?auto=format&fit=crop&w=800&q=60",
      filename: "mediterranean_home"
    },
    price: 2600,
    location: "Amalfi Coast",
    country: "Italy",
  },
  {
    title: "Chalet in the Alps",
    description:
      "Elegant chalet with views of the Alpine peaks and cozy interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1519817650390-64a93db5118b?auto=format&fit=crop&w=800&q=60",
      filename: "alpine_chalet"
    },
    price: 2800,
    location: "Zermatt",
    country: "Switzerland",
  },
  {
    title: "Glamping Safari Tent",
    description:
      "Luxury safari tent experience with full amenities in the wild.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
      filename: "safari_tent"
    },
    price: 1900,
    location: "Maasai Mara",
    country: "Kenya",
  },
  {
    title: "Urban Penthouse",
    description:
      "Spacious penthouse with rooftop terrace and city skyline views.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
      filename: "urban_penthouse"
    },
    price: 4500,
    location: "Dubai",
    country: "UAE",
  },
  {
    title: "Historic Brownstone",
    description:
      "Classic brownstone in a historic neighborhood with modern interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
      filename: "brownstone"
    },
    price: 3000,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Oceanfront Penthouse",
    description:
      "Luxury penthouse with panoramic ocean views and private balcony.",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
      filename: "oceanfront_penthouse"
    },
    price: 6000,
    location: "Sydney",
    country: "Australia",
  },
  {
    title: "Secluded Island Villa",
    description:
      "Private villa on your own island, complete with staff and boat access.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "island_villa"
    },
    price: 8000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Chic Studio in Art District",
    description:
      "Trendy studio space located in a vibrant arts neighborhood.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
      filename: "art_district"
    },
    price: 950,
    location: "Melbourne",
    country: "Australia",
  },
  {
    title: "Vintage A-Frame Cabin",
    description:
      "Retro A-frame cabin tucked in the woods, great for a nostalgic escape.",
    image: {
      url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
      filename: "a_frame_cabin"
    },
    price: 1100,
    location: "Oregon",
    country: "United States",
  },
  {
    title: "Urban Cozy Nest",
    description:
      "Small but thoughtfully designed nest in a bustling city neighborhood.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
      filename: "urban_nest"
    },
    price: 800,
    location: "Toronto",
    country: "Canada",
  },
  {
    title: "Clifftop Mediterranean Escape",
    description:
      "Stunning clifftop location with Mediterranean styling and sea views.",
    image: {
      url: "https://images.unsplash.com/photo-1505691723518-36a9eb3e5c87?auto=format&fit=crop&w=800&q=60",
      filename: "cliff_escape"
    },
    price: 3500,
    location: "Ibiza",
    country: "Spain",
  },
  {
    title: "Forest Retreat Cabin",
    description:
      "Cabin surrounded by dense forest, with hiking trails right outside.",
    image: {
      url: "https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?auto=format&fit=crop&w=800&q=60",
      filename: "forest_cabin"
    },
    price: 1400,
    location: "Whistler",
    country: "Canada",
  },
  {
    title: "Luxury Penthouse Loft",
    description:
      "Contemporary loft with rooftop pool and skyline views.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
      filename: "lux_loft"
    },
    price: 5500,
    location: "Hong Kong",
    country: "China",
  },
  {
    title: "Coastal Cottage Retreat",
    description:
      "Quaint cottage close to the coast, perfect for quiet mornings by the sea.",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
      filename: "coastal_cottage"
    },
    price: 1300,
    location: "Cornwall",
    country: "United Kingdom",
  },
  {
    title: "Tiny House Retreat",
    description:
      "Minimalist tiny house with everything you need for a simple escape.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
      filename: "tiny_house"
    },
    price: 700,
    location: "New Zealand",
    country: "New Zealand",
  },
  {
    title: "Panoramic Hillside Villa",
    description:
      "Luxurious villa with panoramic views over rolling hills and vineyards.",
    image: {
      url: "https://images.unsplash.com/photo-1508082158602-d9abf0c0936b?auto=format&fit=crop&w=800&q=60",
      filename: "hillside_villa"
    },
    price: 4200,
    location: "Tuscany",
    country: "Italy",
  },
   {
    title: "Sunny Rooftop Apartment",
    description:
      "Bright and sunny apartment with a private rooftop terrace and stunning skyline views.",
    image: {
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
      filename: "rooftop_apartment"
    },
    price: 2700,
    location: "Barcelona",
    country: "Spain",
  },
  {
    title: "Luxury Jungle Villa",
    description:
      "Surrounded by dense jungle, this villa offers ultimate privacy and serenity.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      filename: "jungle_villa"
    },
    price: 3800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Hilltop Cottage with Fireplace",
    description:
      "Cosy hilltop cottage with a rustic fireplace and scenic valley views.",
    image: {
      url: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=60",
      filename: "hilltop_cottage"
    },
    price: 1100,
    location: "Manali",
    country: "India",
  },
  {
    title: "Art Deco Studio",
    description:
      "A colorful studio with vintage art deco furnishings in a lively district.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
      filename: "art_deco_studio"
    },
    price: 950,
    location: "Buenos Aires",
    country: "Argentina",
  },
  {
    title: "Modern Floating House",
    description:
      "A contemporary house floating on water with luxurious interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154484-8900cc3d194b?auto=format&fit=crop&w=800&q=60",
      filename: "floating_house"
    },
    price: 4200,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Traditional Japanese Ryokan",
    description:
      "Experience authentic Japanese culture in this peaceful ryokan.",
    image: {
      url: "https://images.unsplash.com/photo-1525097487452-6278ff080c31?auto=format&fit=crop&w=800&q=60",
      filename: "japanese_ryokan"
    },
    price: 1500,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Seaside Cliff House",
    description:
      "Perched on a cliff, this house offers unparalleled ocean views.",
    image: {
      url: "https://images.unsplash.com/photo-1515248137880-09a9e209b7a3?auto=format&fit=crop&w=800&q=60",
      filename: "cliff_house"
    },
    price: 3300,
    location: "Big Sur",
    country: "United States",
  },
  {
    title: "Tropical Pool Bungalow",
    description:
      "Thatched roof bungalow with a private pool surrounded by palm trees.",
    image: {
      url: "https://images.unsplash.com/photo-1615880544543-9a96eeda9c40?auto=format&fit=crop&w=800&q=60",
      filename: "pool_bungalow"
    },
    price: 2900,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "Icelandic Glass Dome",
    description:
      "Sleep under the stars and the northern lights in a glass dome in Iceland.",
    image: {
      url: "https://images.unsplash.com/photo-1600607681073-0bce6fc50257?auto=format&fit=crop&w=800&q=60",
      filename: "glass_dome"
    },
    price: 4500,
    location: "Reykjavik",
    country: "Iceland",
  },
  {
    title: "French Chateau",
    description:
      "An elegant chateau with gardens, wine cellars, and period furnishings.",
    image: {
      url: "https://images.unsplash.com/photo-1590490360182-cbd11e8d5bd1?auto=format&fit=crop&w=800&q=60",
      filename: "french_chateau"
    },
    price: 6000,
    location: "Loire Valley",
    country: "France",
  },
  {
    title: "Nordic Cabin with Sauna",
    description:
      "Traditional wooden cabin with a private sauna and snowy surroundings.",
    image: {
      url: "https://images.unsplash.com/photo-1509833969471-df7f925e1d5d?auto=format&fit=crop&w=800&q=60",
      filename: "nordic_sauna"
    },
    price: 1700,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Vintage Train Car Stay",
    description:
      "Live in a restored vintage train car with all modern comforts.",
    image: {
      url: "https://images.unsplash.com/photo-1582560475961-0440cfb21c52?auto=format&fit=crop&w=800&q=60",
      filename: "train_car_stay"
    },
    price: 1450,
    location: "Texas",
    country: "United States",
  },
  {
    title: "Greek Island House",
    description:
      "Whitewashed walls and blue domes in this iconic Greek island home.",
    image: {
      url: "https://images.unsplash.com/photo-1570114024420-5deef14d1f5d?auto=format&fit=crop&w=800&q=60",
      filename: "greek_home"
    },
    price: 3100,
    location: "Mykonos",
    country: "Greece",
  },
  {
    title: "Elegant Victorian Home",
    description:
      "Step back in time in this meticulously preserved Victorian house.",
    image: {
      url: "https://images.unsplash.com/photo-1574105172961-6e5d59e5d33e?auto=format&fit=crop&w=800&q=60",
      filename: "victorian_home"
    },
    price: 2300,
    location: "San Francisco",
    country: "United States",
  },
  {
    title: "Boho Camper Van",
    description:
      "Travel in style and comfort in this colorful bohemian camper van.",
    image: {
      url: "https://images.unsplash.com/photo-1616593848958-78cf0ffed6ab?auto=format&fit=crop&w=800&q=60",
      filename: "boho_van"
    },
    price: 750,
    location: "California",
    country: "United States",
  },
  {
    title: "Cave House in Cappadocia",
    description:
      "Stay in a traditional cave dwelling with magical valley views.",
    image: {
      url: "https://images.unsplash.com/photo-1590490360182-cbd11e8d5bd1?auto=format&fit=crop&w=800&q=60",
      filename: "cappadocia_cave"
    },
    price: 2100,
    location: "Cappadocia",
    country: "Turkey",
  },
  {
    title: "Safari Lodge Tent",
    description:
      "Enjoy the African wilderness from a luxury tented lodge.",
    image: {
      url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
      filename: "safari_lodge"
    },
    price: 3900,
    location: "Serengeti",
    country: "Tanzania",
  },
  {
    title: "Floating Ice Hotel Room",
    description:
      "A room carved from ice and snow, complete with thermal bedding.",
    image: {
      url: "https://images.unsplash.com/photo-1549490349-931a76b6a64e?auto=format&fit=crop&w=800&q=60",
      filename: "ice_hotel"
    },
    price: 5000,
    location: "Jukkasjärvi",
    country: "Sweden",
  },
  {
    title: "Countryside Windmill House",
    description:
      "Stay in a fully restored historical windmill with panoramic countryside views.",
    image: {
      url: "https://images.unsplash.com/photo-1531936230700-b9e0f2d18e95?auto=format&fit=crop&w=800&q=60",
      filename: "windmill_house"
    },
    price: 2500,
    location: "Kinderdijk",
    country: "Netherlands",
  },
  {
    title: "Private Desert Dome",
    description:
      "Experience off-grid living in a futuristic dome in the heart of the desert.",
    image: {
      url: "https://images.unsplash.com/photo-1542367599-9ff76b6dbb83?auto=format&fit=crop&w=800&q=60",
      filename: "desert_dome"
    },
    price: 3100,
    location: "Nevada",
    country: "United States",
  },
];

module.exports = {data: sampleListings};