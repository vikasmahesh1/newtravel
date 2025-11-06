import { runtimeConfig } from './environment'

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
  return backendAuth.login({ email, password })
}

export async function signUp({ email, password, name }) {
  return backendAuth.signUp({ email, password, name })
}

export async function logout() {
  return backendAuth.logout()
}

export async function loginAdmin(credentials) {
  return backendAuth.loginAdmin(credentials)
}
