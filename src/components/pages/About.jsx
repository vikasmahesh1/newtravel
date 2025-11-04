import React, { useEffect, useState } from 'react'

export default function About(){
  const [now, setNow] = useState(new Date())
  const [visitors, setVisitors] = useState(240)
  const [reviews, setReviews] = useState(128)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setVisitors(v=>Math.max(1, v + (Math.random()*8-4)|0))
      setReviews(r=>Math.max(1, r + (Math.random()*2-1)|0))
    }, 3000)
    return ()=>clearInterval(t)
  },[])

  return (
    <section className="card card-base">
      <h2>About Vyugo Holidays</h2>
      <p className="muted">We are a customer-first travel company building memorable experiences.</p>
      <div style={{marginTop:12}}>
        <div>Current time: <strong>{now.toLocaleString()}</strong></div>
        <div style={{marginTop:8}}>Live visitors on site: <strong>{visitors}</strong></div>
        <div>Recent reviews: <strong>{reviews}</strong></div>
      </div>
    </section>
  )
}
