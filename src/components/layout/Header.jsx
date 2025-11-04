import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.svg'

export default function Header() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeString = now.toLocaleString()

  return (
    <header className="app-header header-gradient">
      <div className="container flex items-center justify-between" style={{padding: '12px 0'}}>
        <div className="brand flex items-center gap-4">
          <img src={Logo} alt="Vyugo Holidays" style={{height:44,width:44,borderRadius:8}} />
          <div>
            <div className="app-title">Vyugo Holidays</div>
            <div className="app-sub">Discover experiences. Travel with joy.</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#" data-page="home">Home</a>
          <a href="#" data-page="hotels">Hotels</a>
          <a href="#" data-page="flights">Flights</a>
          <a href="#" data-page="trains">Trains</a>
          <a href="#" data-page="buses">Buses</a>
          <a href="#" data-page="activities">Activities</a>
          <a href="#" data-page="gallery">Gallery</a>
          <a href="#" data-page="about">About</a>
          <a href="#" data-page="contact">Contact</a>
        </nav>

        <div className="header-right flex items-center gap-4">
          <div className="clock" title={timeString}>{now.toLocaleTimeString()}</div>
          <a className="btn btn-outline-light" href="#login">Login</a>
        </div>
      </div>
    </header>
  )
}
