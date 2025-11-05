import { runtimeConfig } from './environment'

const users = new Map([
  [
    'traveler@example.com',
    {
      password: 'password123',
      name: 'Alex Traveler',
      tier: 'Voyager Gold',
      role: 'traveler',
      points: 18400,
    },
  ],
  [
    'admin@vyugo.com',
    {
      password: 'vyugo-admin',
      name: 'VyuGo Control',
      tier: 'Operations Suite',
      role: 'admin',
    },
  ],
])

const wait = (delay = 350) => new Promise((resolve) => setTimeout(resolve, delay))

const buildUrl = (path) => {
  const prefix = runtimeConfig.apiBaseUrl
  if (!path.startsWith('/')) {
    return `${prefix}/${path}`
  }
  return `${prefix}${path}`
}

const defaultHeaders = () => {
  const headers = { 'Content-Type': 'application/json' }
  if (runtimeConfig.authToken) {
    headers.Authorization = `Bearer ${runtimeConfig.authToken}`
  }
  return headers
}

const handleResponse = async (response) => {
  if (response.status === 204) return null
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`
    throw new Error(message)
  }
  return data
}

const backendAuth = {
  async login(credentials) {
    const response = await fetch(buildUrl('/auth/login'), {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(credentials),
    })
    const profile = await handleResponse(response)
    runtimeConfig.authToken = profile?.token
    return profile
  },
  async signUp(payload) {
    const response = await fetch(buildUrl('/auth/signup'), {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(payload),
    })
    const profile = await handleResponse(response)
    runtimeConfig.authToken = profile?.token
    return profile
  },
  async logout() {
    const response = await fetch(buildUrl('/auth/logout'), {
      method: 'POST',
      headers: defaultHeaders(),
    })
    await handleResponse(response)
    runtimeConfig.authToken = null
    return true
  },
  async loginAdmin(credentials) {
    const response = await fetch(buildUrl('/auth/admin/login'), {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(credentials),
    })
    const profile = await handleResponse(response)
    runtimeConfig.authToken = profile?.token
    return profile
  },
}

export async function login({ email, password }) {
  if (!runtimeConfig.useMocks) {
    return backendAuth.login({ email, password })
  }

  await wait()
  const user = users.get(email)
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password')
  }
  const profile = {
    email,
    name: user.name,
    tier: user.tier,
    role: user.role,
    points: user.points,
    token: 'mock-token',
  }
  runtimeConfig.authToken = profile.token
  return profile
}

export async function signUp({ email, password, name }) {
  if (!runtimeConfig.useMocks) {
    return backendAuth.signUp({ email, password, name })
  }

  await wait()
  if (users.has(email)) {
    throw new Error('Account already exists')
  }
  const profile = {
    email,
    name,
    tier: 'Explorer',
    role: 'traveler',
    points: 0,
    token: 'mock-token',
  }
  users.set(email, { password, name, tier: profile.tier, role: profile.role, points: profile.points })
  runtimeConfig.authToken = profile.token
  return profile
}

export async function logout() {
  if (!runtimeConfig.useMocks) {
    return backendAuth.logout()
  }

  await wait(150)
  runtimeConfig.authToken = null
  return true
}

export async function loginAdmin(credentials) {
  if (!runtimeConfig.useMocks) {
    return backendAuth.loginAdmin(credentials)
  }

  const profile = await login(credentials)
  if (profile.role !== 'admin') {
    throw new Error('Admin access required')
  }
  return profile
}
