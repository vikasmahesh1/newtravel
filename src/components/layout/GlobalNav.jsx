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
      className="fixed bottom-4 left-1/2 z-40 w-[90%] -translate-x-1/2 rounded-full bg-white/90 px-6 py-3 shadow-xl shadow-primary/10 backdrop-blur md:hidden"
    >
      <ul className="flex items-center justify-between text-xs font-semibold text-slate-500">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition ${isActive ? 'text-primary' : 'hover:text-primary'}`
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
