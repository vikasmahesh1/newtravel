import React from 'react'

export default function Home({ count, setCount }) {
  return (
    <main className="app-main">
      <section className="card">
        <h2>Quick actions</h2>
        <p className="muted">A small example to show interactive UI and a clean layout.</p>

        <div className="controls">
          <div className="counter">
            <span className="counter-label">Count</span>
            <span className="counter-value">{count}</span>
          </div>

          <div className="buttons">
            <button className="btn" onClick={() => setCount((c) => c + 1)}>Increment</button>
            <button className="btn btn-outline" onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>
      </section>

      <section className="card small">
        <h3>Next steps</h3>
        <ul>
          <li>Create feature branches off <code>develop</code>.</li>
          <li>Use <code>npm run dev</code> to launch the app locally.</li>
          <li>Try the AI helper: <code>npm run ai:ask -- src/pages/Home.jsx "Review"</code></li>
        </ul>
      </section>
    </main>
  )
}
