import React, { useEffect, useState } from 'react'

export default function Trains(){
  const [now, setNow] = useState(new Date())
  const [trains, setTrains] = useState(12)
  const [delays, setDelays] = useState(2)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setTrains(n=>Math.max(0, n + (Math.random()*4-2)|0))
      setDelays(d=>Math.max(0, d + (Math.random()*2-1)|0))
    }, 4000)
    return ()=>clearInterval(t)
  },[])

  return (
    <section className="card card-base">
      <h2>Trains</h2>
      <p className="muted">Train schedules and live delays.</p>
      <div style={{marginTop:12}}>
        <div>Current server time: <strong>{now.toLocaleString()}</strong></div>
        <div style={{marginTop:8}}>Trains departing soon: <strong>{trains}</strong></div>
        <div>Delayed services: <strong>{delays}</strong></div>
      </div>
    </section>
  )
}
