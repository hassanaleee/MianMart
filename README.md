<div align="center">

  <img src="./public/images/readme-banner.png" alt="MianMart Banner" width="100%" />

  # 🛒 MianMart
  **A modern, fast, and responsive online grocery & supermarket storefront built with Next.js and TypeScript.**

  [![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-PostCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![ESLint](https://img.shields.io/badge/ESLint-Configured-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

  [Features](#-key-features) • [Product Catalog](#-product-catalog--categories) • [Architecture](#-project-architecture) • [Getting Started](#-getting-started) • [Scripts](#-available-scripts)

</div>

---

## 📖 Overview

**MianMart** is a full-featured, responsive e-commerce web application designed for online grocery and supermarket shopping. Built on the **Next.js App Router** and **TypeScript**, it offers a smooth, mobile-first shopping experience complete with real-time search, interactive cart drawers, wishlist persistence, and a streamlined checkout workflow.

---

## ✨ Key Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🏪 Rich Storefront Experience</h3>
      <ul>
        <li><b>Dynamic Landing Page:</b> Features a promotional hero banner, category browser, today's deals, fresh arrivals, popular brands, value highlights (<em>Why Choose Us</em>), and mobile app download sections.</li>
        <li><b>Smart Search & Filtering:</b> Dedicated product catalog (<code>/products</code>) with an interactive search bar and dynamic product detail views (<code>/products/[id]</code>).</li>
        <li><b>Mobile-First Navigation:</b> Persistent mobile bottom navigation bar, top delivery announcement banner, and a responsive footer.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🛍️ Seamless Shopping Flow</h3>
      <ul>
        <li><b>Slide-Over Cart Drawer:</b> Instant cart management from any page via <code>CartContext</code>, paired with a dedicated full-page cart overview (<code>/cart</code>).</li>
        <li><b>Wishlist Management:</b> Save and manage favorite grocery items using <code>WishlistContext</code> and a dedicated <code>/wishlist</code> route.</li>
        <li><b>Checkout & User Feedback:</b> Multi-step checkout experience (<code>/checkout</code>), real-time toast notifications (<code>ToastContext</code>), graceful image fallbacks, and custom empty states.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🗂️ Product Catalog & Categories

MianMart includes a pre-populated JSON product catalog (`src/data/products.json`) alongside 35+ local product images covering everyday household staples:

| Category | Featured Items in Store |
| :--- | :--- |
| 🍎 **Fresh Produce** | Red Delicious Apples, Farm Fresh Bananas, Sindhri Mangoes, Red Tomatoes, Premium Potatoes, Pink Onions, Fresh Garlic & Ginger |
| 🥛 **Dairy & Breakfast** | Olper's Milk (1L) & Cream, MilkPak Creamy Milk, Grade-A Eggs, Cheddar Cheese, Bran Bread, Sesame Burger Buns, Sooji Rusk |
| 🫖 **Beverages & Tea** | Tapal Danedar, Lipton Yellow Label, Fruita Vitals Orange Juice, Pepsi Cola |
| 🍪 **Snacks & Frozen** | Sooper Biscuits, Chocolicious Double Chocolate, Lay's Classic, Kurkure Toofani, K&N's Chicken Nuggets & Fiery Fingers |
| 🧴 **Household & Personal Care** | Surf Excel, Ariel Original, Vim Lemon, Safeguard Charcoal Soap, Sunsilk Shampoo, Sensodyne Herbal, Johnson's Baby Soap, Pampers Baby-Dry, Cerelac Wheat |

---

## 🏗️ Project Architecture

```text
MianMart-main/
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
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `18.17` or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/MianMart.git
   cd MianMart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   Visit [http://localhost:3000](http://localhost:3000) to explore the MianMart storefront.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode at `http://localhost:3000` |
| `npm run build` | Builds the application for production usage |
| `npm run start` | Starts the Next.js production server |
| `npm run lint` | Runs ESLint to catch code quality and formatting issues |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <sub>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.</sub>
</div>