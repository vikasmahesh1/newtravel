import popularRoutes from '../../data/popularRoutes.js'

export function PopularRoutesGrid() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-6">
      <h2 className="section-title">Popular routes curated by local experts</h2>
      <p className="section-subtitle">
        Discover experiences that balance iconic highlights with under-the-radar gems.
      </p>
      <div className="mt-10 grid-auto-fit">
        {popularRoutes.map((route) => (
          <article key={route.id} className="card">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">{route.title}</h3>
                <p className="text-sm text-slate-600">{route.description}</p>
              </div>
              <span className="hidden h-20 w-20 rounded-2xl bg-muted text-3xl md:flex md:items-center md:justify-center">
                🌍
              </span>
            </div>
            <button className="btn-primary mt-6">View itinerary</button>
          </article>
        ))}
      </div>
    </section>
  )
}
