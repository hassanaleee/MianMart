const fs = require("fs");
const path = require("path");

const productsDir = path.join(__dirname, "..", "..", "public", "images", "products");

// Create directories if they do not exist
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Function to generate premium SVGs for products
const generateSvg = (name, brand, category, color1, color2, iconText, weight) => {
  // Determine standard vector icon representations based on category
  let mainGraphic = "";
  if (category === "Fruits" || category === "Vegetables") {
    mainGraphic = `
      <g transform="translate(200, 190)">
        <circle cx="0" cy="0" r="70" fill="url(#grad)" filter="url(#drop-shadow)" />
        <path d="M -15,-60 Q 0,-90 25,-85 Q 15,-60 -5,-65 Z" fill="#2A9D8F" />
        <text x="0" y="20" font-family="'Outfit', sans-serif" font-size="64" text-anchor="middle">${iconText}</text>
      </g>
    `;
  } else if (category === "Dairy" || category === "Beverages") {
    mainGraphic = `
      <!-- Packaging Box / Bottle -->
      <g transform="translate(140, 100)" filter="url(#drop-shadow)">
        <rect x="0" y="30" width="120" height="170" rx="16" fill="url(#grad)" />
        <path d="M 10,30 L 30,0 L 90,0 L 110,30 Z" fill="#ffffff" opacity="0.9" />
        <circle cx="60" cy="8" r="12" fill="#e2e8f0" />
        <!-- Label panel -->
        <rect x="15" y="70" width="90" height="90" rx="8" fill="#ffffff" opacity="0.95" />
        <text x="60" y="115" font-family="'Outfit', sans-serif" font-weight="900" font-size="22" fill="${color2}" text-anchor="middle">${brand.substring(0, 8)}</text>
        <text x="60" y="140" font-family="'Outfit', sans-serif" font-weight="700" font-size="11" fill="#475569" text-anchor="middle">${name.substring(0, 15)}</text>
        <text x="60" y="22" font-family="'Outfit', sans-serif" font-size="32" text-anchor="middle">${iconText}</text>
      </g>
    `;
  } else if (category === "Bakery" || category === "Snacks") {
    mainGraphic = `
      <!-- Bag / Wrapper packaging -->
      <g transform="translate(130, 110)" filter="url(#drop-shadow)">
        <rect x="0" y="20" width="140" height="150" rx="24" fill="url(#grad)" />
        <path d="M -10,20 L 150,20" stroke="#ffffff" stroke-width="4" stroke-dasharray="8 4" opacity="0.5" />
        <path d="M -10,150 L 150,150" stroke="#ffffff" stroke-width="4" stroke-dasharray="8 4" opacity="0.5" />
        <!-- Design badge -->
        <rect x="20" y="55" width="100" height="80" rx="14" fill="#ffffff" />
        <text x="70" y="90" font-family="'Outfit', sans-serif" font-weight="900" font-size="18" fill="${color1}" text-anchor="middle">${brand}</text>
        <text x="70" y="115" font-family="'Outfit', sans-serif" font-weight="700" font-size="11" fill="#64748b" text-anchor="middle">${weight}</text>
        <text x="70" y="40" font-family="'Outfit', sans-serif" font-size="36" text-anchor="middle">${iconText}</text>
      </g>
    `;
  } else if (category === "Frozen Food") {
    mainGraphic = `
      <!-- Frozen Pack -->
      <g transform="translate(130, 110)" filter="url(#drop-shadow)">
        <rect x="0" y="10" width="140" height="160" rx="20" fill="url(#grad)" />
        <rect x="15" y="50" width="110" height="90" rx="10" fill="#ffffff" />
        <text x="70" y="90" font-family="'Outfit', sans-serif" font-weight="900" font-size="20" fill="#dc2626" text-anchor="middle">${brand}</text>
        <text x="70" y="115" font-family="'Outfit', sans-serif" font-weight="700" font-size="12" fill="#1e293b" text-anchor="middle">${name.split(" ").slice(1).join(" ")}</text>
        <text x="70" y="38" font-family="'Outfit', sans-serif" font-size="32" text-anchor="middle">🍗</text>
        <!-- Snowflake decoration -->
        <text x="115" y="32" font-family="sans-serif" font-size="14" fill="#ffffff" opacity="0.8">❄️</text>
      </g>
    `;
  } else {
    // Household / Care / Baby
    mainGraphic = `
      <!-- Household Bottle / Soap / Tub -->
      <g transform="translate(140, 100)" filter="url(#drop-shadow)">
        <rect x="10" y="40" width="100" height="150" rx="20" fill="url(#grad)" />
        <rect x="30" y="10" width="60" height="30" rx="8" fill="#ffffff" opacity="0.9" />
        <rect x="40" y="0" width="40" height="10" fill="#e2e8f0" />
        <!-- Label -->
        <rect x="20" y="80" width="80" height="80" rx="12" fill="#ffffff" />
        <text x="60" y="115" font-family="'Outfit', sans-serif" font-weight="900" font-size="15" fill="${color2}" text-anchor="middle">${brand}</text>
        <text x="60" y="135" font-family="'Outfit', sans-serif" font-weight="750" font-size="9" fill="#64748b" text-anchor="middle">${name.split(" ")[1] || "Care"}</text>
        <text x="60" y="65" font-family="'Outfit', sans-serif" font-size="28" text-anchor="middle">${iconText}</text>
      </g>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FCFCFB" />
          <stop offset="100%" stop-color="#F3F4F1" />
        </linearGradient>
        <filter id="drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#1e293b" flood-opacity="0.08" />
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1e293b" flood-opacity="0.04" />
        </filter>
      </defs>

      <!-- Background Card -->
      <rect width="400" height="400" rx="32" fill="url(#bgGrad)" stroke="#f1f5f9" stroke-width="2" />
      
      <!-- Subtle circles design pattern -->
      <circle cx="200" cy="200" r="140" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.6" />
      
      <!-- Main Product Graphic -->
      ${mainGraphic}
      
      <!-- Badge Details bottom -->
      <rect x="20" y="340" width="360" height="40" rx="14" fill="#ffffff" opacity="0.9" />
      <text x="200" y="365" font-family="'Outfit', sans-serif" font-weight="700" font-size="13" fill="#1e293b" text-anchor="middle">
        ${brand} • ${weight}
      </text>
    </svg>
  `;
};

// Data list matching our products.json
const productAssets = [
  { file: "apples.svg", name: "Red Delicious Apples", brand: "Fresh Farm", category: "Fruits", c1: "#F87171", c2: "#DC2626", emoji: "🍎", wt: "1 kg" },
  { file: "bananas.svg", name: "Imported Farm Bananas", brand: "Fresh Farm", category: "Fruits", c1: "#FDE047", c2: "#EAB308", emoji: "🍌", wt: "1 Dozen" },
  { file: "mangoes.svg", name: "Sindhri Mangoes", brand: "Fresh Farm", category: "Fruits", c1: "#FBBF24", c2: "#D97706", emoji: "🥭", wt: "1 kg" },
  { file: "tomatoes.svg", name: "Fresh Red Tomatoes", brand: "Local Organic", category: "Vegetables", c1: "#F87171", c2: "#EF4444", emoji: "🍅", wt: "1 kg" },
  { file: "potatoes.svg", name: "Premium Potatoes", brand: "Local Organic", category: "Vegetables", c1: "#F59E0B", c2: "#B45309", emoji: "🥔", wt: "1 kg" },
  { file: "onions.svg", name: "Fresh Pink Onions", brand: "Local Organic", category: "Vegetables", c1: "#FDA4AF", c2: "#E11D48", emoji: "🧅", wt: "1 kg" },
  { file: "ginger.svg", name: "Fresh Ginger", brand: "Local Organic", category: "Vegetables", c1: "#FDE047", c2: "#CA8A04", emoji: "🫚", wt: "250 g" },
  { file: "garlic.svg", name: "Fresh Garlic", brand: "Local Organic", category: "Vegetables", c1: "#F1F5F9", c2: "#CBD5E1", emoji: "🧄", wt: "250 g" },
  
  { file: "nestle_milkpak.svg", name: "Nestlé Milkpak Creamy Milk", brand: "Nestlé Milkpak", category: "Dairy", c1: "#3B82F6", c2: "#1D4ED8", emoji: "🥛", wt: "1 Litre" },
  { file: "olpers_milk.svg", name: "Olper's UHT Pure Milk", brand: "Olper's", category: "Dairy", c1: "#EF4444", c2: "#B91C1C", emoji: "🥛", wt: "1 Litre" },
  { file: "olpers_cream.svg", name: "Olper's Dairy Cream", brand: "Olper's", category: "Dairy", c1: "#F3F4F6", c2: "#EF4444", emoji: "🥛", wt: "200 ml" },
  { file: "eggs.svg", name: "Fresh Farm Eggs", brand: "Fresh Farm", category: "Dairy", c1: "#FEF08A", c2: "#FBBF24", emoji: "🥚", wt: "1 Dozen" },
  { file: "cheese.svg", name: "Adam's Cheddar Cheese Block", brand: "Adam's", category: "Dairy", c1: "#FCD34D", c2: "#F59E0B", emoji: "🧀", wt: "200 g" },
  
  { file: "bread.svg", name: "Dawn Premium Bran Bread", brand: "Dawn", category: "Bakery", c1: "#D97706", c2: "#78350F", emoji: "🍞", wt: "Large" },
  { file: "burger_buns.svg", name: "Dawn Sesame Burger Buns", brand: "Dawn", category: "Bakery", c1: "#F59E0B", c2: "#B45309", emoji: "🍔", wt: "4 Pack" },
  { file: "rusk.svg", name: "Dawn Crispy Sooji Rusk", brand: "Dawn", category: "Bakery", c1: "#FBBF24", c2: "#D97706", emoji: "🥖", wt: "350 g" },
  
  { file: "sooper_biscuits.svg", name: "Peek Freans Sooper Biscuits", brand: "Peek Freans", category: "Snacks", c1: "#EF4444", c2: "#B91C1C", emoji: "🍪", wt: "Family Pack" },
  { file: "chocolicious.svg", name: "Peek Freans Chocolicious", brand: "Peek Freans", category: "Snacks", c1: "#78350F", c2: "#451A03", emoji: "🍪", wt: "Family Pack" },
  { file: "lays.svg", name: "Lays Classic Salted", brand: "Lays", category: "Snacks", c1: "#FDE047", c2: "#EAB308", emoji: "🥔", wt: "Large Pack" },
  { file: "kurkure.svg", name: "Kurkure Toofani Masala", brand: "Kurkure", category: "Snacks", c1: "#EF4444", c2: "#C2410C", emoji: "🌶️", wt: "Medium Pack" },
  
  { file: "tapal_tea.svg", name: "Tapal Danedar Family Pack Tea", brand: "Tapal", category: "Beverages", c1: "#10B981", c2: "#047857", emoji: "☕", wt: "450 g" },
  { file: "lipton_tea.svg", name: "Lipton Yellow Label Black Tea", brand: "Lipton", category: "Beverages", c1: "#FBBF24", c2: "#D97706", emoji: "☕", wt: "400 g" },
  { file: "pepsi.svg", name: "Pepsi Cola Carbonated Drink", brand: "Pepsi", category: "Beverages", c1: "#2563EB", c2: "#1D4ED8", emoji: "🥤", wt: "1.5 Litre" },
  { file: "nestle_juice.svg", name: "Nestlé Fruita Vitals Orange Juice", brand: "Nestlé Fruita Vitals", category: "Beverages", c1: "#F97316", c2: "#EA580C", emoji: "🍊", wt: "1 Litre" },
  
  { file: "kn_nuggets.svg", name: "K&N's Premium Chicken Nuggets", brand: "K&N's", category: "Frozen Food", c1: "#DC2626", c2: "#991B1B", emoji: "🍗", wt: "Standard Pack" },
  { file: "kn_fiery.svg", name: "K&N's Fiery Fingers", brand: "K&N's", category: "Frozen Food", c1: "#DC2626", c2: "#EA580C", emoji: "🍟", wt: "Standard Pack" },
  
  { file: "surf_excel.svg", name: "Surf Excel Easy Wash Detergent", brand: "Surf Excel", category: "Household", c1: "#2563EB", c2: "#1D4ED8", emoji: "🧼", wt: "1 kg" },
  { file: "ariel.svg", name: "Ariel Machine Wash Original", brand: "Ariel", category: "Household", c1: "#10B981", c2: "#047857", emoji: "🧼", wt: "1 kg" },
  { file: "vim.svg", name: "Vim Dishwashing Liquid Lemon", brand: "Vim", category: "Household", c1: "#FBBF24", c2: "#84CC16", emoji: "🍋", wt: "500 ml" },
  
  { file: "safeguard_soap.svg", name: "Safeguard Active Charcoal Soap", brand: "Safeguard", category: "Personal Care", c1: "#1D4ED8", c2: "#1E293B", emoji: "🫧", wt: "135 g" },
  { file: "sunsilk_shampoo.svg", name: "Sunsilk Black Shine Shampoo", brand: "Sunsilk", category: "Personal Care", c1: "#1E293B", c2: "#0F172A", emoji: "🧴", wt: "360 ml" },
  { file: "sensodyne.svg", name: "Sensodyne Herbal Multi Care", brand: "Sensodyne", category: "Personal Care", c1: "#10B981", c2: "#3B82F6", emoji: "🪥", wt: "100 g" },
  
  { file: "pampers.svg", name: "Pampers Baby-Dry Diapers", brand: "Pampers", category: "Baby Care", c1: "#06B6D4", c2: "#0891B2", emoji: "👶", wt: "40 Count" },
  { file: "johnsons_soap.svg", name: "Johnson's Mild Baby Soap", brand: "Johnson & Johnson", category: "Baby Care", c1: "#FDA4AF", c2: "#FB7185", emoji: "🧼", wt: "100 g" },
  { file: "nestle_cerelac.svg", name: "Nestlé Cerelac Wheat", brand: "Nestlé", category: "Baby Care", c1: "#FBBF24", c2: "#EA580C", emoji: "🥣", wt: "350 g" }
];

// Write all SVGs
productAssets.forEach((asset) => {
  const content = generateSvg(
    asset.name,
    asset.brand,
    asset.category,
    asset.c1,
    asset.c2,
    asset.emoji,
    asset.wt
  );
  fs.writeFileSync(path.join(productsDir, asset.file), content);
  console.log(`Generated: ${asset.file}`);
});

console.log("Assets generation finished successfully!");
