const normalizeBaseUrl = (value) => {
  if (!value) return 'http://127.0.0.1:4000'
  const trimmed = value.trim()
  if (!trimmed) return 'http://127.0.0.1:4000'
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed
}

const parseBoolean = (value, defaultValue) => {
  if (value === undefined || value === null || value === '') {
    return defaultValue
  }
  const normalized = String(value).trim().toLowerCase()
  if (['true', '1', 'yes', 'on'].includes(normalized)) return true
  if (['false', '0', 'no', 'off'].includes(normalized)) return false
  return defaultValue
}

export const runtimeConfig = {
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
  useMocks: parseBoolean(import.meta.env.VITE_USE_MOCKS, true),
  authToken: import.meta.env.VITE_AUTH_TOKEN,
}
