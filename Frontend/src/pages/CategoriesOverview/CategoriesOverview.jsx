import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';

const allCategories = [
  {
    title: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1887&auto=format&fit=crop",
    link: "/category/Men"
  },
  {
    title: "Women",
    image: "https://images.unsplash.com/photo-1485230895905-27bea30dd80e?q=80&w=2072&auto=format&fit=crop",
    link: "/category/Women"
  },
  {
    title: "Children",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1972&auto=format&fit=crop",
    link: "/category/Children"
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2015&auto=format&fit=crop",
    link: "/category/Accessories"
  }
];

export default function CategoriesOverview() {
  return (
    <PageWrapper className="min-h-screen bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-4">
            Shop by Category
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Explore our diverse collections across various categories tailored just for you.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allCategories.map((category) => (
            <Link
              key={category.title}
              to={category.link}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Glassmorphism Title Box */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{category.title}</h3>
                <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Explore Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
}
