import React, { useEffect, useState } from 'react'

export default function Gallery(){
  const [now, setNow] = useState(new Date())
  const [views, setViews] = useState(420)

  useEffect(()=>{
    const t = setInterval(()=>{
      setNow(new Date())
      setViews(v=>Math.max(1, v + (Math.random()*15-7)|0))
    }, 3500)
    return ()=>clearInterval(t)
  },[])

  // placeholder gallery images (use logo as placeholders)
  const imgs = [1,2,3,4,5,6]

  return (
    <section className="card card-base">
      <h2>Gallery</h2>
      <p className="muted">Explore photos from our destinations and customer trips.</p>
      <div style={{marginTop:12}}>Current time: <strong>{now.toLocaleString()}</strong></div>
      <div style={{marginTop:12,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:12}}>
        {imgs.map(i=> (
          <div key={i} style={{background:'#fff',borderRadius:8,overflow:'hidden',height:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={'/src/assets/logo.svg'} alt={`gallery-${i}`} style={{width: '80%',opacity:0.9}} />
          </div>
        ))}
      </div>
      <div style={{marginTop:12}}>Gallery views: <strong>{views}</strong></div>
    </section>
  )
}
