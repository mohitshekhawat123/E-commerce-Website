import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const categories = [
  {
    title: "T-Shirts",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop",
    link: "/products?category=T-Shirts"
  },
  {
    title: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    link: "/products?category=Outerwear"
  },
  {
    title: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop",
    link: "/products?category=Jeans"
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    link: "/products?category=Accessories"
  }
]

export function Categories() {
  return (
    <section className="py-16 md:py-24 bg-[#f8f8f8]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111]">Shop by Category</h2>
          <Link to="/products" className="hidden sm:flex items-center text-sm font-medium text-[#111111] hover:underline">
            View All Categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.link}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Explore <ArrowRight className="ml-1 justify-center h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link to="/products" className="flex items-center text-sm font-medium text-primary hover:underline">
            View All Categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
