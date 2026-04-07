import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  return (
    <section className="py-24 bg-[#f8f8f8] border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-6 text-[#111111] shadow-sm">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#111111]">
            Get 10% Off Your First Order
          </h2>

          <p className="text-lg text-[#6b7280] mb-10">
            Join our newsletter for exclusive access to new drops, sales, and style inspiration.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-12 text-base rounded-full px-6 flex-1 bg-white border-gray-200 focus:border-[#111111] focus:ring-[#111111]"
              required
            />
            <Button type="submit" size="lg" className="h-12 px-8 rounded-full font-semibold bg-[#111111] text-white hover:bg-black/90">
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-[#6b7280] mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  )
}
