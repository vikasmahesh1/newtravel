export function Footer() {
  return (
    <footer className="mt-16 bg-secondary py-12 text-orange-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">VyuGo Holidays</p>
          <p className="mt-3 text-sm text-orange-200/80">
            Boutique journeys, signature stays, and soulful escapes curated by travel designers across VyuGo Holidays.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-orange-100/80">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-orange-100/80">
            <li>Help center</li>
            <li>Travel advisories</li>
            <li>Cancellation policy</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">Stay in the loop</p>
          <p className="mt-3 text-sm text-orange-100/80">Sign up for curated deals and itinerary inspiration.</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <input type="email" className="input" placeholder="Email address" aria-label="Email address" />
            <button type="submit" className="btn-primary whitespace-nowrap bg-accent text-secondary hover:bg-[#ff9a2e]">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-orange-200/70">
        © {new Date().getFullYear()} VyuGo Holidays. Crafted for demo purposes.
      </div>
    </footer>
  )
}
