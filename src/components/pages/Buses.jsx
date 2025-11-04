import React, { useEffect, useState } from 'react'

export default function Buses(){
  const [now, setNow] = useState(new Date())
  const [routes, setRoutes] = useState(24)
  const [seats, setSeats] = useState(120)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setRoutes(r=>Math.max(1, r + (Math.random()*6-3)|0))
      setSeats(s=>Math.max(0, s + (Math.random()*40-20)|0))
    }, 3300)
    return ()=>clearInterval(t)
  },[])

  return (
    <section className="card card-base">
      <h2>Buses</h2>
      <p className="muted">Coach and bus availability across routes.</p>
      <div style={{marginTop:12}}>
        <div>Current server time: <strong>{now.toLocaleString()}</strong></div>
        <div style={{marginTop:8}}>Active routes: <strong>{routes}</strong></div>
        <div>Seats available: <strong>{seats}</strong></div>
      </div>
    </section>
  )
}
