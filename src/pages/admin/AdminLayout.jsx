import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAdmin } from '../../features/admin/adminSlice'
import { selectAdminProfile, selectAdminStatus } from '../../store'

const navLinks = [
  { to: '.', label: 'Overview', end: true },
  { to: 'inventory', label: 'Inventory' },
  { to: 'bookings', label: 'Bookings' },
  { to: 'payments', label: 'Payments' },
  { to: 'users', label: 'Users & Support' },
]

export default function AdminLayout({ previewMode = false }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector(selectAdminProfile)
  const status = useSelector(selectAdminStatus)

  const handleSignOut = async () => {
    try {
      await dispatch(logoutAdmin()).unwrap()
      navigate(previewMode ? '/admin/login' : '/login', { replace: true })
    } catch (error) {
      // noop for mock environment
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white/80 px-6 py-8 lg:flex">
          <div className="mb-10 flex items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">admin.vyugo.com</span>
            <span className="font-display text-xl font-semibold text-slate-900">VyuGo Control</span>
          </div>
          <nav className="flex flex-1 flex-col gap-2 text-sm font-semibold">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 rounded-3xl bg-slate-900 px-4 py-5 text-sm text-white">
            <p className="font-semibold">Need backend access?</p>
            <p className="mt-2 text-white/70">Connect this panel to your API by replacing the mock handlers under src/services.</p>
          </div>
        </aside>
        <main className="flex-1">
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/80 px-6 py-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">VyuGo Admin</h1>
              <p className="text-sm text-slate-500">Manage inventory, bookings, and partners powering vyugo.com.</p>
            </div>
            <div className="flex items-center gap-3">
              {profile ? (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {profile.name}
                </span>
              ) : null}
              <button className="btn-secondary" type="button" onClick={handleSignOut} disabled={status === 'loading'}>
                {status === 'loading' ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </header>
          {previewMode && (
            <div className="bg-amber-100 px-6 py-3 text-sm text-amber-800">
              You are previewing the admin console from vyugo.com. Deploy this build to admin.vyugo.com for live operations.
            </div>
          )}
          <section className="px-6 py-10">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  )
}
