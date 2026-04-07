import { Link } from "react-router-dom"
import { MOCK_PRODUCTS } from "../../data/mockProducts"

import { Button } from "@/components/ui/button"
import { StaggerContainer, StaggerItem } from "../../components/Animations"
import { ProductCard } from "../ProductCard"

// Generic Product Grid component that can be used for "Trending" or "New Arrivals"
export function ProductGrid({ title, subtitle, products = [], viewAllLink = "/products" }) {

  if (!products || products.length < 4) {
    // Fallback Mock Data if no products provided or fewer than 4 items passed
    products = [
      MOCK_PRODUCTS.find(p => p.id === 1) || MOCK_PRODUCTS[0],
      MOCK_PRODUCTS.find(p => p.id === 10) || MOCK_PRODUCTS[1], // Zoro
      MOCK_PRODUCTS.find(p => p.id === 5) || MOCK_PRODUCTS[2],  // Sanji
      MOCK_PRODUCTS.find(p => p.id === 6) || MOCK_PRODUCTS[3]   // Straw Hat Denim
    ]
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-[#111111]">{title}</h2>
            {subtitle && <p className="text-[#6b7280] text-lg">{subtitle}</p>}
          </div>
          <Button variant="outline" asChild className="shrink-0 w-full md:w-fit text-[#111111] border-[#111111] hover:bg-[#111111] hover:text-white transition-colors">
            <Link to={viewAllLink}>View All</Link>
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
