import React, { useEffect, useState } from 'react'

export default function Contact(){
  const [now, setNow] = useState(new Date())
  const [agents, setAgents] = useState(6)
  const [queue, setQueue] = useState(2)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setAgents(a=>Math.max(1, a + (Math.random()*2-1)|0))
      setQueue(q=>Math.max(0, q + (Math.random()*3-1)|0))
    }, 4000)
    return ()=>clearInterval(t)
  },[])

  return (
    <section className="card card-base">
      <h2>Contact Us</h2>
      <p className="muted">We're here to help — reach out via email or phone, or use the quick form below.</p>
      <div style={{marginTop:12}}>
        <div>Current time: <strong>{now.toLocaleString()}</strong></div>
        <div style={{marginTop:8}}>Support agents online: <strong>{agents}</strong></div>
        <div>Customers in queue: <strong>{queue}</strong></div>
      </div>

      <form style={{marginTop:12}} onSubmit={e=>e.preventDefault()}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input className="input" placeholder="Your name" aria-label="Name" />
          <input className="input" placeholder="Email" aria-label="Email" />
        </div>
        <textarea className="input" placeholder="Message" style={{width:'100%',marginTop:8}} />
        <div style={{marginTop:8}}>
          <button className="btn btn-primary">Send message</button>
        </div>
      </form>
    </section>
  )
}
