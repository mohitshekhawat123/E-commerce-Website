import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { Search, LogOut, LogIn, Menu, Heart, ShoppingCart, User, X, Home } from "lucide-react"

import FullLogo from "../../assets/FullLogo.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import SearchBar from "./SearchBar"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { cartTotalItems } = useCart()
  const { wishlistItems } = useWishlist()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    setIsLoggedIn(false)
    navigate("/login")
  }

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Left: Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 shrink-0">
            <span className="sr-only">CRAG</span>
            <img src={FullLogo} alt="CRAG Logo" className="h-10 w-auto object-contain" />
          </Link>

          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
          </div>
        </div>

        {/* Middle: Navigation Links */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {[
                { label: 'Home', path: '/' },
                { label: 'Shop', path: '/products' },
                { label: 'New Arrivals', path: '/new-arrivals' },
                { label: 'Collections', path: '/collections' },
                { label: 'Sale', path: '/sale' },
                { label: 'Brands', path: '/brands' }
              ].map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link to={item.path}>
                    <NavigationMenuLink
                      active={location.pathname === item.path}
                      className={`${navigationMenuTriggerStyle()} ${location.pathname === item.path
                        ? '!bg-black !text-white hover:!bg-gray-800'
                        : 'text-gray-500 hover:text-black font-medium'
                        }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Search Bar & User Actions */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-end gap-2 md:gap-4">
          <SearchBar isMobile={false} />

          <Button variant="ghost" size="icon" className="shrink-0 relative" asChild>
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
              {wishlistItems?.length > 0 && (
                <span className="absolute top-0 right-0 h-4 min-w-[16px] px-1 text-[10px] flex items-center justify-center rounded-full bg-red-500 text-white font-bold pointer-events-none">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="shrink-0 relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartTotalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 min-w-[16px] px-1 text-[10px] flex items-center justify-center rounded-full bg-[#111111] text-white font-bold pointer-events-none">
                  {cartTotalItems}
                </span>
              )}
            </Link>
          </Button>

          {isLoggedIn ? (
            <Button variant="ghost" size="icon" className="shrink-0" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <Link to="/login">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Log in</span>
              </Link>
            </Button>
          )}
        </div>

      </div>

      {/* Mobile Backdrop & Drawer Wrapper */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 \${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className={`absolute top-0 left-0 w-[85%] max-w-[320px] h-full bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] \${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>

          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <Link to="/" className="-m-1.5 p-1.5 shrink-0" onClick={() => setMobileMenuOpen(false)}>
              <img src={FullLogo} alt="CRAG Logo" className="h-8 w-auto object-contain" />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full hover:bg-gray-100 h-10 w-10">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-6">
            <SearchBar isMobile={true} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Menu</h3>
            {[
              { label: 'Home', path: '/' },
              { label: 'Shop', path: '/products' },
              { label: 'New Arrivals', path: '/new-arrivals' },
              { label: 'Collections', path: '/collections' },
              { label: 'Sale', path: '/sale' },
              { label: 'Brands', path: '/brands' }
            ].map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block rounded-2xl px-4 py-3.5 text-lg font-bold transition-all active:scale-[0.98] \${location.pathname === item.path
                    ? 'bg-[#111111] text-white shadow-md'
                    : 'text-[#111111] hover:bg-[#f8f8f8]'
                    }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto border-t border-gray-100 pt-6 mt-8">
            {isLoggedIn ? (
              <Button
                variant="outline"
                className="w-full justify-center gap-2 h-14 rounded-2xl font-bold border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all"
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
              >
                <LogOut className="h-5 w-5" />
                Log out
              </Button>
            ) : (
              <Button variant="default" className="w-full justify-center gap-2 h-14 rounded-2xl font-bold bg-[#111111] text-white hover:bg-black/90 active:scale-[0.98] transition-all shadow-lg" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <LogIn className="h-5 w-5" />
                  Log in
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-6 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-40 flex justify-between items-center transition-all duration-300">

        <Link to="/" className={`flex flex-col items-center justify-center w-12 gap-1.5 transition-colors \${location.pathname === '/' ? 'text-[#111111]' : 'text-gray-400 hover:text-[#111111]'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>

        <Link to="/products" className={`flex flex-col items-center justify-center w-12 gap-1.5 transition-colors \${location.pathname === '/products' ? 'text-[#111111]' : 'text-gray-400 hover:text-[#111111]'}`}>
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold">Shop</span>
        </Link>

        <Link to="/cart" className={`flex flex-col items-center justify-center w-12 gap-1.5 relative transition-colors \${location.pathname === '/cart' ? 'text-[#111111]' : 'text-gray-400 hover:text-[#111111]'}`}>
          <ShoppingCart className="w-6 h-6" />
          <span className="text-[10px] font-bold">Cart</span>
          {cartTotalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-[18px] min-w-[18px] px-1 text-[10px] flex items-center justify-center rounded-full bg-[#111111] text-white font-black border-2 border-white shadow-sm">
              {cartTotalItems > 99 ? '99+' : cartTotalItems}
            </span>
          )}
        </Link>

        <Link to="/wishlist" className={`flex flex-col items-center justify-center w-12 gap-1.5 relative transition-colors \${location.pathname === '/wishlist' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
          <Heart className={`w-6 h-6 \${location.pathname === '/wishlist' ? 'fill-current' : ''}`} />
          <span className="text-[10px] font-bold">Wishlist</span>
          {wishlistItems?.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-[18px] min-w-[18px] px-1 text-[10px] flex items-center justify-center rounded-full bg-red-500 text-white font-black border-2 border-white shadow-sm">
              {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
            </span>
          )}
        </Link>

        {isLoggedIn ? (
          <Link to="/account" className={`flex flex-col items-center justify-center w-12 gap-1.5 transition-colors \${location.pathname === '/account' ? 'text-[#111111]' : 'text-gray-400 hover:text-[#111111]'}`}>
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Profile</span>
          </Link>
        ) : (
          <Link to="/login" className={`flex flex-col items-center justify-center w-12 gap-1.5 transition-colors \${location.pathname === '/login' ? 'text-[#111111]' : 'text-gray-400 hover:text-[#111111]'}`}>
            <LogIn className="w-6 h-6" />
            <span className="text-[10px] font-bold">Login</span>
          </Link>
        )}

      </div>
    </header>
  )
}

export default Header
