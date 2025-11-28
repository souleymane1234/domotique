import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Products from './components/Products'
import Features from './components/Features'
import Booking from './components/Booking'
import Footer from './components/Footer'

function App() {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <div className="app">
      <Hero onBookClick={() => setShowBooking(true)} />
      <Products />
      <Features />
      <Booking isOpen={showBooking} onClose={() => setShowBooking(false)} />
      <Footer />
    </div>
  )
}

export default App
