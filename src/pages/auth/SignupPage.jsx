import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { signupUser } from '../../features/user/userSlice'
import { selectUserProfile } from '../../store'
import { usePageMetadata } from '../../hooks/usePageMetadata'

export default function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector(selectUserProfile)
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  usePageMetadata({
    title: 'Create a VyuGo Holidays account',
    description: 'Join VyuGo Holidays to unlock curated travel deals, loyalty perks, and seamless bookings.',
    keywords: 'VyuGo signup, travel account, join VyuGo Holidays',
    canonicalPath: '/signup',
  })

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
      await dispatch(signupUser(formValues)).unwrap()
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="card space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">Create your travel HQ</h1>
          <p className="text-sm text-slate-500">Join to unlock rewards, curated deals, and streamlined itineraries.</p>
        </div>
        {error && <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="input"
              placeholder="Preferred name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              className="input"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Create account
          </button>
        </form>
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
