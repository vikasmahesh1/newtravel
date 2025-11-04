import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-root">
      <Header />

      <Home count={count} setCount={setCount} />

      <Footer />
    </div>
  )
}
