import { Button } from "@/components/ui/button"

export function SaleBanner() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#111111] text-white min-h-[350px] md:min-h-[450px] flex items-center">
          {/* Background image half */}
          <div
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 bg-cover bg-center bg-no-repeat opacity-40 md:opacity-100 mix-blend-overlay md:mix-blend-normal"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop')",
              clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)"
            }}
          />

          <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-sm text-sm font-bold tracking-widest uppercase mb-6 w-fit">
              End of Season Sale
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight">
              Up to <br /><span className="text-white/70 italic">50% OFF</span>
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
              Refresh your wardrobe with our massive end-of-season clearance. Everything must go!
            </p>

            <Button size="lg" className="bg-white text-[#111111] hover:bg-gray-200 w-fit text-lg px-8 py-6 rounded-full font-bold shadow-xl transition-transform hover:scale-105">
              Shop Sale Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
