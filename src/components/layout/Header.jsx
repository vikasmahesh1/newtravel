import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice'
import { selectUserProfile } from '../../store'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Flights', to: '/flights' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'Buses', to: '/buses' },
  { label: 'Deals', to: '/#deals' },
]

export function Header() {
  const profile = useSelector(selectUserProfile)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-slate-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">✈️</span>
          NewTravel
        </NavLink>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
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
    </header>
  )
}
