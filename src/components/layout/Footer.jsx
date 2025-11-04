import { NavLink } from 'react-router-dom'

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/#careers', external: true },
  { label: 'Press', to: '/#press', external: true },
]

const supportLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Cancellation policy', to: '/cancellation-policy' },
  { label: 'Help center', to: '/#support', external: true },
]

export function Footer() {
  return (
    <footer className="mt-16 bg-secondary py-12 text-orange-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">VyuGo Holidays</p>
          <p className="mt-3 text-sm text-orange-200/80">
            Boutique journeys, signature stays, and soulful escapes curated by travel designers across VyuGo Holidays.
          </p>
          <div className="mt-4 space-y-2 text-sm text-orange-100/70">
            <p>
              <span className="font-semibold text-orange-100">Head office:</span> 1st Floor, Cinema Rd, Opp. Satya Gowri Theatre,
              Suryanarayana Puram, Kakinada, Andhra Pradesh 533001
            </p>
            <p>
              <span className="font-semibold text-orange-100">Hyderabad lounge:</span> Road No. 36, Jubilee Hills, Hyderabad,
              Telangana 500033
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-orange-100/80">
            {companyLinks.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a href={item.to} className="hover:text-white" rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <NavLink to={item.to} className="hover:text-white">
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-orange-100/80">
            {supportLinks.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a href={item.to} className="hover:text-white" rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <NavLink to={item.to} className="hover:text-white">
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
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
          <div className="mt-6 space-y-1 text-xs text-orange-200/70">
            <p>Concierge desk: +91 90145 67890</p>
            <p>Support: support@vyugo.in</p>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-orange-200/70">
        © {new Date().getFullYear()} VyuGo Holidays. Crafted for demo purposes.
      </div>
    </footer>
  )
}
