export function BrandStory() {
  return (
    <section className="py-20 md:py-32 bg-[#f1f1f1] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#6b7280] uppercase mb-6">
          Our Philosophy
        </h2>

        <p className="text-3xl md:text-5xl font-serif font-medium leading-tight text-[#111111]">
          "We create <span className="text-[#111111] italic">minimal, comfortable fashion</span> designed for everyday wear. Because true style doesn't have to shout."
        </p>

        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-[#111111] rounded-full" />
        </div>
      </div>
    </section>
  )
}
