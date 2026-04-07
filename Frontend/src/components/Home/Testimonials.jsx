import { Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const reviews = [
  {
    id: 1,
    name: "Rahul M.",
    role: "Verified Buyer",
    rating: 5,
    text: "Great quality and fast delivery! The oversized hoodie is exactly what I was looking for. Will definitely shop here again.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    id: 2,
    name: "Priya S.",
    role: "Verified Buyer",
    rating: 5,
    text: "Obsessed with the minimalist collection. The fabrics feel so premium and the fit is just perfect.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: 3,
    name: "Arjun K.",
    role: "Verified Buyer",
    rating: 4,
    text: "Customer service is top-notch. I had to exchange a size and the process was smooth. Plus the denim jacket is fire.",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#111111]">What Our Customers Say</h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Trusted by thousands of happy customers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg text-[#111111]">{review.name}</span>
                  <span className="text-sm text-[#6b7280]">{review.role}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-[#6b7280] leading-relaxed italic">
                  "{review.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
