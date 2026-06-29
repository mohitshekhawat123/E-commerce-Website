import React from 'react'
import './App.css' 
import { RouterProvider } from 'react-router-dom'

import router from './routes/routes'
import { div } from 'framer-motion/client'

function abc(){
  console.log(import.meta.env.VITE_API_URL)
}
function App() {
  return (
    <div>
      
      <RouterProvider router = {router} />
      
    </div>
   
    
  )
}

export default App
