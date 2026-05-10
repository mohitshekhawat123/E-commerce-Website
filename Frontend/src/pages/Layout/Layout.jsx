import React from 'react'
import Header from '../../components/Header/Header'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import useIdleTimeout from '../../hooks/useIdleTimeout'
import customFetch from '../../utils/api'

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    // Only attempt logout if we are not already on the login or register page
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      try {
        await customFetch('/auth/logout', { method: 'POST' });
        alert('You have been automatically logged out due to inactivity.');
        navigate('/login');
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
  };

  useIdleTimeout(handleLogout, 15 * 60 * 1000); // 15 minutes

  return (
    <div className="flex flex-col min-h-screen pb-16 lg:pb-0">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
