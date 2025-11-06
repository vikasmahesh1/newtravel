import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../../features/admin/adminSlice'
import { selectAdminError, selectAdminProfile, selectAdminStatus } from '../../store'

export default function AdminLoginPage({ previewMode = false }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector(selectAdminProfile)
  const status = useSelector(selectAdminStatus)
  const error = useSelector(selectAdminError)
  const [credentials, setCredentials] = useState({ email: 'admin@vyugo.com', password: 'vyugo-admin' })

  useEffect(() => {
    if (profile) {
      navigate(previewMode ? '/admin' : '/', { replace: true })
    }
  }, [profile, navigate, previewMode])

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginAdmin(credentials))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12 text-slate-100">
      <div className="w-full max-w-lg rounded-3xl bg-white/5 p-10 shadow-2xl shadow-black/20 backdrop-blur-lg">
        <div className="mb-8 space-y-2 text-center">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-200">
            admin.vyugo.com
          </span>
          <h1 className="text-3xl font-semibold text-white">VyuGo Control Login</h1>
          <p className="text-sm text-slate-200/70">
            Use your operations credentials to access live inventory, bookings, and payment tooling.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-2 text-sm font-semibold text-slate-200">
            Email
            <input
              className="input"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-200">
            Password
            <input
              className="input"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>
          {error && (
            <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-200" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Validating credentials…' : 'Enter admin console'}
          </button>
          <p className="text-center text-xs text-slate-200/60">
            Need access? Contact VyuGo engineering to provision your admin account.
          </p>
        </form>
      </div>
    </div>
  )
}
