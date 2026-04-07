import React from 'react'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

const Layout = () => {
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
