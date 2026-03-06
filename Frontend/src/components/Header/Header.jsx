import React from 'react'
import FullLogo from '../../assets/FullLogo.png'
import { Link ,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser"); // optional
    setIsLoggedIn(false);
    navigate("/login");
  };

    
  return (
    <header className="bg-transparent">
  <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <div className="flex lg:flex-1">
      <Link to="/" className="-m-1.5 p-1.5">
        <span className="sr-only">CRAG</span>
        <img src={FullLogo} alt="" className="h-15 w-auto" />
      </Link >
    </div>
    <div className="flex lg:hidden">
      <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>
       
      </button>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">
     
     <Link to="/collections" className="text-sm/6 font-semibold text-gray-900">Welcome</Link >
      <Link to="/" className="text-sm/6 font-semibold text-gray-900">Products</Link >
      
      <Link to="/contacts" className="text-sm/6 font-semibold text-gray-900">Contact</Link >
      <Link to="/about" className="text-sm/6 font-semibold text-gray-900">About Company</Link >
      {isLoggedIn && 
      (<Link to="/sell" className="text-sm/6 font-semibold text-gray-900">Sell</Link >)}
    </div>
   <div className="hidden lg:flex lg:flex-1 lg:justify-end">
  {isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
    >
      Log out
    </button>
  ) : (
    <Link
      to="/login"
      className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
    >
      Log in <span aria-hidden="true">&rarr;</span>
    </Link>
  )}
</div>
  </nav>
  {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
  <div role="dialog" aria-modal="true" className="lg:hidden">
    {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
    <div className="fixed inset-0 z-50"></div>
    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            <div className="-mx-3">
              <button type="button" aria-controls="products" aria-expanded="false" className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                Products
                
               
              </button>
              
             
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </div>
</header>

  )
}

export default Header
