import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';

const categoryData = {
  Men: [
    { title: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1800&auto=format&fit=crop" },
    { title: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop" },
    { title: "Shirts", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2080&auto=format&fit=crop" },
    { title: "Shoes", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1974&auto=format&fit=crop" },
  ],
  Women: [
    { title: "Tops", image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1974&auto=format&fit=crop" },
    { title: "Dresses", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
    { title: "Handbags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2015&auto=format&fit=crop" },
  ],
  Children: [
    { title: "Clothing", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1972&auto=format&fit=crop" },
    { title: "Toys", image: "https://images.unsplash.com/photo-1558066118-bfbe2fbaaa96?q=80&w=1965&auto=format&fit=crop" },
  ],
  Accessories: [
    { title: "Hats", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2187&auto=format&fit=crop" },
    { title: "Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop" },
    { title: "Watches", image: "https://images.unsplash.com/photo-1523275323863-8a30aa0cc0c1?q=80&w=1974&auto=format&fit=crop" },
  ]
};

export default function Subcategories() {
  const { categoryName } = useParams();
  
  // Format Category name to ensure case matches dictionary
  const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
  const subcategories = categoryData[formattedCategory] || [];

  return (
    <PageWrapper className="min-h-screen bg-[#F8F8F8] py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#111111] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/categories" className="hover:text-[#111111] transition-colors">Categories</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#111111]">{formattedCategory}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-2">
            {formattedCategory} Collection
          </h1>
          <p className="text-gray-500 text-lg">
            Choose a subcategory to filter the finest pieces of {formattedCategory.toLowerCase()}'s wear.
          </p>
        </div>

        {/* Subcategories Grid */}
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {subcategories.map((sub) => (
              <Link
                key={sub.title}
                to={`/products/${formattedCategory}/${sub.title}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-3 hover:-translate-y-1"
              >
                <div className="w-full h-56 rounded-2xl overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${sub.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
                
                <div className="pt-5 pb-3 px-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#111111]">{sub.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">Category not found</h2>
            <p className="text-gray-500 mt-2">The category you are looking for does not exist or has no subcategories.</p>
            <Link to="/categories" className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-[#111111] text-white rounded-xl font-bold hover:bg-black transition-colors">
              Return to Categories
            </Link>
          </div>
        )}

      </div>
    </PageWrapper>
  );
}
