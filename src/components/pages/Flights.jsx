import React, { useEffect, useState } from 'react'

export default function Flights(){
  const [now, setNow] = useState(new Date())
  const [deals, setDeals] = useState(124)
  const [active, setActive] = useState(320)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setDeals(d=>Math.max(10, d + (Math.random()*10-5)|0))
      setActive(a=>Math.max(1, a + (Math.random()*20-10)|0))
    }, 3000)
    return ()=>clearInterval(t)
  },[])

  return (
    <section className="card card-base">
      <h2>Flights</h2>
      <p className="muted">Live flight deals and availability.</p>
      <div style={{marginTop:12}}>
        <div>Current server time: <strong>{now.toLocaleString()}</strong></div>
        <div style={{marginTop:8}}>Active offers: <strong>{deals}</strong></div>
        <div>Users browsing flights: <strong>{active}</strong></div>
      </div>
    </section>
  )
}
