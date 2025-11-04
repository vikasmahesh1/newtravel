import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice'
import { selectUserProfile } from '../../store'
import logo from '../../assets/vyugo-logo.svg'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Flights', to: '/flights' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'Buses', to: '/buses' },
  { label: 'Holiday packages', to: '/holidays' },
]

export function Header() {
  const profile = useSelector(selectUserProfile)
  const dispatch = useDispatch()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur shadow-sm relative">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 font-display text-xl font-semibold text-slate-900">
          <img src={logo} alt="VyuGo Holidays" className="h-10 w-auto" />
        </NavLink>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-primary-nav"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="text-lg" aria-hidden>
            {mobileMenuOpen ? '✕' : '☰'}
          </span>
          Menu
        </button>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {profile ? (
            <>
              <NavLink
                to="/profile"
                className="hidden rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20 md:block"
              >
                {profile.name}
              </NavLink>
              <button onClick={handleLogout} className="btn-secondary hidden md:inline-flex">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hidden text-sm font-semibold text-slate-600 hover:text-primary md:block">
                Sign in
              </NavLink>
              <NavLink to="/signup" className="btn-primary">
                Join now
              </NavLink>
            </>
          )}
        </div>
      </div>
      <nav
        id="mobile-primary-nav"
        aria-label="Mobile primary navigation"
        aria-hidden={!mobileMenuOpen}
        className={`md:hidden absolute left-0 right-0 top-full origin-top rounded-b-3xl border-t border-slate-100 bg-white/95 shadow-xl transition-all duration-200 ${
          mobileMenuOpen ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <ul className="max-h-[70vh] space-y-2 overflow-y-auto px-6 py-4 text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 transition ${isActive ? 'text-primary' : ''}`
                }
                to={item.to}
              >
                <span>{item.label}</span>
                <span aria-hidden>›</span>
              </NavLink>
            </li>
          ))}
          <li className="pt-2 text-xs font-medium uppercase tracking-wide text-slate-400">Account</li>
          {profile ? (
            <>
              <li>
                <NavLink className="flex items-center justify-between py-2" to="/profile">
                  <span>Profile</span>
                  <span aria-hidden>›</span>
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-full bg-secondary/10 px-4 py-2 text-left font-semibold text-secondary transition hover:bg-secondary/20"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="flex items-center justify-between py-2" to="/login">
                  <span>Sign in</span>
                  <span aria-hidden>›</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center justify-between py-2" to="/signup">
                  <span>Create account</span>
                  <span aria-hidden>›</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
