import React, { useState } from 'react'

const ProductGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    // Ensure there's always at least one image even if array is empty or undefined
    const validImages = images?.length > 0 ? images : ["https://placehold.co/800x1000/eeeeee/cccccc?text=No+Image"]

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6 sticky top-24">

            {/* Thumbnails (Left side on desktop, bottom on mobile) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide md:w-24 lg:w-32 shrink-0">
                {validImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-[3/4] border-2 transition-all duration-300 w-20 md:w-full shrink-0 ${activeIndex === idx ? 'border-[#111111] opacity-100' : 'border-transparent opacity-60 hover:opacity-100 bg-[#f8f8f8]'
                            }`}
                    >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover object-center" />
                    </button>
                ))}
            </div>

            {/* Main Large Image */}
            <div className="flex-1 rounded-2xl md:rounded-3xl overflow-hidden bg-[#f8f8f8] aspect-[3/4] md:aspect-[4/5] relative group cursor-crosshair">
                <img
                    src={validImages[activeIndex]}
                    alt="Main Product"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
            </div>

        </div>
    )
}

export default ProductGallery
