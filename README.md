🛒 MianMartA modern, fast, and responsive online grocery & supermarket storefront built with Next.js and TypeScript.Features • Product Catalog • Architecture • Getting Started • Scripts📖 OverviewMianMart is a full-featured, responsive e-commerce web application designed for online grocery and supermarket shopping. Built on the Next.js App Router and TypeScript, it offers a smooth, mobile-first shopping experience complete with real-time search, interactive cart drawers, wishlist persistence, and a streamlined checkout workflow.✨ Key Features🗂️ Product Catalog & CategoriesMianMart includes a pre-populated JSON product catalog (src/data/products.json) alongside 35+ local product images covering everyday household staples:CategoryFeatured Items in Store🍎 Fresh ProduceRed Delicious Apples, Farm Fresh Bananas, Sindhri Mangoes, Red Tomatoes, Premium Potatoes, Pink Onions, Fresh Garlic & Ginger🥛 Dairy & BreakfastOlper's Milk (1L) & Cream, MilkPak Creamy Milk, Grade-A Eggs, Cheddar Cheese, Bran Bread, Sesame Burger Buns, Sooji Rusk🫖 Beverages & TeaTapal Danedar, Lipton Yellow Label, Fruita Vitals Orange Juice, Pepsi Cola🍪 Snacks & FrozenSooper Biscuits, Chocolicious Double Chocolate, Lay's Classic, Kurkure Toofani, K&N's Chicken Nuggets & Fiery Fingers🧴 Household & Personal CareSurf Excel, Ariel Original, Vim Lemon, Safeguard Charcoal Soap, Sunsilk Shampoo, Sensodyne Herbal, Johnson's Baby Soap, Pampers Baby-Dry, Cerelac Wheat🏗️ Project ArchitectureMianMart-main/
├── public/
│   └── images/
│       ├── readme-banner.png   # Repository header banner
│       └── products/           # Local product PNG/SVG assets & placeholder.svg
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   │   ├── cart/               # Full shopping cart page (/cart)
│   │   ├── checkout/           # Order checkout workflow (/checkout)
│   │   ├── products/           # Catalog listing (/products) & dynamic [id] details
│   │   ├── wishlist/           # Saved wishlist items page (/wishlist)
│   │   ├── globals.css         # Global styles & Tailwind CSS setup
│   │   ├── layout.tsx          # Root layout wrapping global context providers
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── page.tsx            # Storefront landing page
│   ├── components/
│   │   ├── cart/               # CartDrawer slide-over component
│   │   ├── home/               # HeroBanner, Categories, TodaysDeals, FreshArrivals, PopularBrands, WhyChooseUs, DownloadApp
│   │   ├── layout/             # Navbar, SearchBar, DeliveryBanner, MobileBottomNav, Footer
│   │   └── ui/                 # Reusable ProductCard, ProductImage, EmptyState
│   ├── context/                # React Context providers (CartContext, WishlistContext, ToastContext)
│   ├── data/                   # Static catalog dataset (products.json)
│   ├── scripts/                # Asset generation utilities (generate_assets.js)
│   └── types/                  # Shared TypeScript interfaces & types
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies & scripts
├── postcss.config.mjs          # PostCSS / Tailwind configuration
└── tsconfig.json               # TypeScript compiler configuration
🚀 Getting StartedPrerequisitesNode.js 18.17 or laternpm, yarn, pnpm, or bunInstallation & Local DevelopmentClone the repositorygit clone https://github.com/your-username/MianMart.git
cd MianMart
Install dependenciesnpm install
Start the development servernpm run dev
Open in your browser
Visit http://localhost:3000 to explore the MianMart storefront.📜 Available ScriptsCommandDescriptionnpm run devRuns the app in development mode at http://localhost:3000npm run buildBuilds the application for production usagenpm run startStarts the Next.js production servernpm run lintRuns ESLint to catch code quality and formatting issues🤝 ContributingContributions, issues, and feature requests are welcome! Feel free to fork the repository and submit a pull request.Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request
