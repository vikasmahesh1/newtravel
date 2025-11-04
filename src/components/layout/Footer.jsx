import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Try to read a build date from /build-info.json if available (deployed build can include it)
  const [buildDate, setBuildDate] = useState(null)

  useEffect(() => {
    fetch('/build-info.json').then(r => r.ok ? r.json() : null).then(j => {
      if (j && j.buildDate) setBuildDate(j.buildDate)
    }).catch(() => {})
  }, [])

  return (
    <footer className="app-footer footer-dark">
      <div className="footer-grid container grid grid-cols-4">
        <div className="footer-column">
          <div className="footer-brand">Vyugo Holidays</div>
          <p className="muted">We craft memorable trips and experiences. Trusted by travelers worldwide.</p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#packages">Packages</a></li>
            <li><a href="#deals">Deals</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#privacy">Privacy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <div className="footer-contact">info@vyugoholidays.com</div>
          <div className="socials">
            <a aria-label="Twitter" href="#" className="social">🐦</a>
            <a aria-label="Facebook" href="#" className="social">📘</a>
            <a aria-label="Instagram" href="#" className="social">📸</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom container flex justify-between items-center">
        <div>© {new Date().getFullYear()} Vyugo Holidays — Server time: {now.toLocaleString()}</div>
        <div className="muted">Last deployed: {buildDate || 'unknown'}</div>
      </div>
    </footer>
  )
}
