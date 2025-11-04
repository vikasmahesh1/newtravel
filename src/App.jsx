import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-root">
      <Header />

      <Home count={count} setCount={setCount} />

      <Footer />
    </div>
  )
}
