import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, ArrowRight, Zap, CheckCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FullLogo from '../../assets/FullLogo.png'

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8">
      {/* Footer Top Section with Trust Badges */}
      <div className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-gray-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Zap className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-bold text-white">Fast & Free Shipping</h4>
              <p className="text-sm text-gray-400">On all orders over ₹2000</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-bold text-white">Secure Payments</h4>
              <p className="text-sm text-gray-400">Highest level of security</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <CheckCircle className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-bold text-white">Premium Quality</h4>
              <p className="text-sm text-gray-400">Crafted with care and precision</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-6 inline-block">
              <img src={FullLogo} alt="CRAG Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-xs">
              Minimal, comfortable fashion designed for everyday wear. Because true style doesn't have to shout.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-tight text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-red-400 hover:text-red-300 transition-colors font-medium flex items-center">
                  Sale Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-tight text-white">Customer Support</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-400 hover:text-white transition-colors">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* Mini Newsletter inside Footer vs duplicate ? */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-tight text-white">Stay in the Loop</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white"
              />
              <Button type="submit" className="w-full gap-2 bg-white text-black hover:bg-gray-200">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} CRAG Retail. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
