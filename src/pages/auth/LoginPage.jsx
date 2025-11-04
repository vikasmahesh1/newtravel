import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../../features/user/userSlice'
import { selectUserProfile } from '../../store'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector(selectUserProfile)
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (profile) {
      navigate('/profile')
    }
  }, [profile, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setError('')
      await dispatch(loginUser(formValues)).unwrap()
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="card space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to access saved searches and loyalty perks.</p>
        </div>
        {error && <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
        </form>
        <p className="text-sm text-slate-500">
          New to NewTravel?{' '}
          <Link to="/signup" className="text-secondary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
