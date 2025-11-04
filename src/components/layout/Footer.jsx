export function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 py-12 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">NewTravel</p>
          <p className="mt-3 text-sm text-slate-400">
            Crafting human-centered journeys with flexible fares, curated stays, and seamless experiences across the globe.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>Help center</li>
            <li>Travel advisories</li>
            <li>Cancellation policy</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Stay in the loop</p>
          <p className="mt-3 text-sm text-slate-400">Sign up for curated deals and itinerary inspiration.</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <input type="email" className="input" placeholder="Email address" aria-label="Email address" />
            <button type="submit" className="btn-secondary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} NewTravel. Crafted for demo purposes.
      </div>
    </footer>
  )
}
