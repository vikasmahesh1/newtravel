import React, { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/pages/Home'
import Hotels from './components/pages/Hotels'
import Flights from './components/pages/Flights'
import Trains from './components/pages/Trains'
import Buses from './components/pages/Buses'
import Activities from './components/pages/Activities'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Gallery from './components/pages/Gallery'

export default function App() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    // simple nav handler: links in header use data-page attributes
    const handler = (e) => {
      const a = e.target.closest && e.target.closest('a')
      if (!a) return
      const p = a.getAttribute('data-page')
      if (p) {
        e.preventDefault()
        setPage(p)
        window.scrollTo(0,0)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div className="app-root">
      <Header />

      <main className="app-main container">
  {page === 'home' && <Home />}
  {page === 'hotels' && <Hotels />}
  {page === 'flights' && <Flights />}
  {page === 'trains' && <Trains />}
  {page === 'buses' && <Buses />}
  {page === 'activities' && <Activities />}
  {page === 'about' && <About />}
  {page === 'contact' && <Contact />}
  {page === 'gallery' && <Gallery />}
      </main>

      <Footer />
    </div>
  )
}
