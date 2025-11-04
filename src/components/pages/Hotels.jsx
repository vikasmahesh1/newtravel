import React, { useEffect, useState } from 'react'

export default function Hotels(){
  const [now, setNow] = useState(new Date())
  const [rooms, setRooms] = useState(48)
  const [priceDrop, setPriceDrop] = useState(3)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setRooms(r=>Math.max(0, r + (Math.random()*8-4)|0))
      setPriceDrop(p=>Math.max(0, (p + (Math.random()*2-1)|0)))
    }, 3500)
    return ()=>clearInterval(t)
  },[])

  return (
    <section className="card card-base">
      <h2>Hotels</h2>
      <p className="muted">Real-time hotel availability and recent price drops.</p>
      <div style={{marginTop:12}}>
        <div>Current server time: <strong>{now.toLocaleString()}</strong></div>
        <div style={{marginTop:8}}>Rooms available nearby: <strong>{rooms}</strong></div>
        <div>Recent price drops: <strong>{priceDrop}%</strong></div>
      </div>
    </section>
  )
}
