import React, { useEffect, useState } from 'react';

const collectionsData = [
  {
    id: 1,
    title: "Summer Essentials",
    description: "Lightweight fabrics and sun-kissed shades for effortless warm-weather days.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 2,
    title: "Streetwear Edit",
    description: "Bold graphics, loose fits, and urban utility designed for the modern streets.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 3,
    title: "Minimal Classics",
    description: "Timeless silhouettes and neutral palettes that form the foundation of any wardrobe.",
    image: "https://images.unsplash.com/photo-1608248593685-1d0411d33cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 4,
    title: "Evening Luxe",
    description: "Sophisticated tailoring and elegant drapes for nights to remember.",
    image: "https://images.unsplash.com/photo-1571513685601-38ae62d733db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  }
];

export default function Collections() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slight delay for fade-in effect on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (collectionName) => {
    console.log(`Navigating to collection: ${collectionName}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans selection:bg-black selection:text-white pb-32">
      {/* Header Section */}
      <div
        className={`px-6 py-24 md:py-32 text-center max-w-4xl mx-auto flex flex-col items-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 block">
          Curated For You
        </span>
        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-black mb-8 leading-tight">
          Our Collections
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Discover fashion through curated stories designed for every mood and moment.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {collectionsData.map((collection, index) => (
            <div
              key={collection.id}
              onClick={() => handleNavigation(collection.title)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer h-[400px] md:h-[500px] shadow-sm hover:shadow-2xl transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Background Image with zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
                role="img"
                aria-label={collection.title}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-100 z-0"></div>
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:bg-black/40 z-0"></div>

              {/* Text Content block */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end z-10 transition-transform duration-700">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {collection.title}
                </h2>
                <p className="text-gray-200 text-base md:text-lg font-light mb-8 max-w-md opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                  {collection.description}
                </p>

                <div className="mt-auto items-start justify-start flex">
                  <button className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl active:scale-95">
                    Explore Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
