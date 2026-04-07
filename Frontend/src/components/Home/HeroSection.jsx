import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem, AnimatedButtonWrapper } from "../../components/Animations"
import { useNavigate } from "react-router-dom"

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image Setup */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Subtle Gradient Overlay for text readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <StaggerContainer className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <StaggerItem>
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-foreground backdrop-blur-md text-sm font-medium mb-4 uppercase tracking-wider">
            New Summer Collection 2026
          </span>
        </StaggerItem>

        <StaggerItem>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-md">
            Minimal. Comfortable. Stylish.
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-sm">
            Discover our latest arrivals designed for everyday elegance and ultimate comfort. Elevate your wardrobe today.
          </p>
        </StaggerItem>

        <StaggerItem className="flex flex-col sm:flex-row gap-4">
          <AnimatedButtonWrapper>
            <Button size="lg" onClick={() => navigate('/products')} className="w-full sm:w-auto text-lg px-8 py-6 rounded-full font-semibold bg-white text-[#111111] hover:bg-gray-100 hover:scale-105 transition-all">
              Shop Now
            </Button>
          </AnimatedButtonWrapper>
          <AnimatedButtonWrapper>
            <Button size="lg" onClick={() => navigate('/collections')} variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full font-semibold bg-transparent text-white border-white hover:bg-white/10 transition-all">
              View Lookbook
            </Button>
          </AnimatedButtonWrapper>
        </StaggerItem>
      </StaggerContainer>
    </section>
  )
}
