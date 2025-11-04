import React, { useEffect, useState } from 'react'

export default function Activities(){
  const [now, setNow] = useState(new Date())
  const [tours, setTours] = useState(9)
  const [spots, setSpots] = useState(36)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setTours(t=>Math.max(0, t + (Math.random()*4-2)|0))
      setSpots(s=>Math.max(0, s + (Math.random()*10-5)|0))
    }, 3800)
    return ()=>clearInterval(t)
  },[])

  return (
    <section className="card card-base">
      <h2>Activities</h2>
      <p className="muted">Book tours, experiences and local activities.</p>
      <div style={{marginTop:12}}>
        <div>Current server time: <strong>{now.toLocaleString()}</strong></div>
        <div style={{marginTop:8}}>Tours available: <strong>{tours}</strong></div>
        <div>Spots left today: <strong>{spots}</strong></div>
      </div>
    </section>
  )
}
