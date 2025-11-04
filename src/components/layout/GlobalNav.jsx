import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/', icon: '🏠' },
  { label: 'Flights', to: '/flights', icon: '✈️' },
  { label: 'Hotels', to: '/hotels', icon: '🏨' },
  { label: 'Buses', to: '/buses', icon: '🚌' },
  { label: 'Holidays', to: '/holidays', icon: '🏝️' },
]

export function GlobalNav() {
  return (
    <nav
      aria-label="Global navigation"
      className="fixed bottom-4 left-1/2 z-40 w-[92%] -translate-x-1/2 rounded-3xl border border-white/60 bg-white/95 px-6 py-3 shadow-xl shadow-primary/15 backdrop-blur md:hidden"
    >
      <ul className="flex items-center justify-between text-xs font-semibold text-slate-700">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-full px-3 py-1 transition ${
                  isActive ? 'bg-primary/10 text-primary' : 'hover:text-primary'
                }`
              }
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
