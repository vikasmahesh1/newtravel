import React, { useEffect, useState } from 'react'

export default function Home() {
  const [now, setNow] = useState(new Date())
  const [visitors, setVisitors] = useState(512)
  const [hotelsNearby, setHotelsNearby] = useState(42)
  const [flightDeals, setFlightDeals] = useState(124)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setVisitors(v=>Math.max(50, v + (Math.random()*40-20)|0))
      setHotelsNearby(h=>Math.max(0, h + (Math.random()*4-2)|0))
      setFlightDeals(f=>Math.max(0, f + (Math.random()*6-3)|0))
    }, 3000)
    return ()=>clearInterval(t)
  },[])

  return (
    <div style={{width:'100%'}}>
      <section className="card card-base">
        <h2>Welcome to Vyugo Holidays</h2>
        <p className="muted">Live snapshot of site activity and offers.</p>

        <div className="controls" style={{marginTop:12}}>
          <div className="counter">
            <span className="counter-label">Visitors right now</span>
            <span className="counter-value">{visitors}</span>
          </div>

          <div className="counter">
            <span className="counter-label">Hotels nearby</span>
            <span className="counter-value">{hotelsNearby}</span>
          </div>

          <div className="counter">
            <span className="counter-label">Flight deals</span>
            <span className="counter-value">{flightDeals}</span>
          </div>
        </div>
      </section>

      <section className="card card-base" style={{marginTop:16}}>
        <h3>Quick links</h3>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:8}}>
          <a className="btn btn-outline" href="#" data-page="hotels">Hotels</a>
          <a className="btn btn-outline" href="#" data-page="flights">Flights</a>
          <a className="btn btn-outline" href="#" data-page="trains">Trains</a>
          <a className="btn btn-outline" href="#" data-page="buses">Buses</a>
          <a className="btn btn-outline" href="#" data-page="activities">Activities</a>
          <a className="btn btn-outline" href="#" data-page="gallery">Gallery</a>
        </div>
      </section>
    </div>
  )
}
