import React from 'react'
import { HeroSection } from "../../components/Home/HeroSection"
import { Categories } from "../../components/Home/Categories"
import { ProductGrid } from "../../components/Home/ProductGrid"
import { SaleBanner } from "../../components/Home/SaleBanner"
import { BrandStory } from "../../components/Home/BrandStory"
import { Testimonials } from "../../components/Home/Testimonials"
import { Newsletter } from "../../components/Home/Newsletter"
import { FadeUpSection } from "../../components/Animations"

const trendingProducts = [
  {
    id: 1,
    name: "Gear 5 Oversized Graphic Tee",
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 428,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 3,
    name: "Zoro Emerald 3-Sword Hoodie",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
    badge: "Sale",
    isNew: false
  },
  {
    id: 5,
    name: "Sanji Noir Tailored Trousers",
    price: 5999,
    originalPrice: null,
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=2070&auto=format&fit=crop",
    badge: "Trending",
    isNew: false
  },
  {
    id: 6,
    name: "Straw Hat Vintage Denim Jacket",
    price: 3999,
    originalPrice: 5999,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1974&auto=format&fit=crop",
    badge: "Sale",
    isNew: false
  }
];

const newArrivalsProducts = [
  {
    id: 2,
    name: "Nami Navigator Crop Top",
    price: 2499,
    originalPrice: null,
    rating: 5.0,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1974&auto=format&fit=crop",
    badge: null,
    isNew: true
  },
  {
    id: 4,
    name: "Chopper Blossom Pink Beanie",
    price: 699,
    originalPrice: null,
    rating: 4.8,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1887&auto=format&fit=crop",
    badge: null,
    isNew: true
  },
  {
    id: 7,
    name: "Robin Poneglyph Tote Bag",
    price: 1899,
    originalPrice: null,
    rating: 4.9,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop",
    badge: null,
    isNew: true
  },
  {
    id: 8,
    name: "Franky 'Super' Techwear Jacket",
    price: 4199,
    originalPrice: null,
    rating: 4.7,
    reviews: 48,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1974&auto=format&fit=crop",
    badge: null,
    isNew: true
  }
];

const Home = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Categories Grid */}
      <FadeUpSection delay={0.1}>
        <Categories />
      </FadeUpSection>

      {/* 3. Featured / Trending Products (Has internal stagger) */}
      <ProductGrid
        title="Trending Now"
        subtitle="Our most loved pieces this week."
        products={trendingProducts}
      />

      {/* 4. Sale Banner (Drives Conversions) */}
      <FadeUpSection delay={0.1}>
        <SaleBanner />
      </FadeUpSection>

      {/* 5. New Arrivals (Has internal stagger) */}
      <ProductGrid
        title="New Arrivals"
        subtitle="Explore the latest drops in our collection."
        viewAllLink="/new-arrivals"
        products={newArrivalsProducts}
      />

      {/* 6. Brand Story */}
      <FadeUpSection delay={0.1}>
        <BrandStory />
      </FadeUpSection>

      {/* 7. Customer Reviews / Social Proof */}
      <FadeUpSection delay={0.1}>
        <Testimonials />
      </FadeUpSection>

      {/* 8. Newsletter Signup */}
      <FadeUpSection delay={0.1}>
        <Newsletter />
      </FadeUpSection>
    </div>
  )
}

export default Home
