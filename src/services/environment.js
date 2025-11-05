const normalizeBaseUrl = (value) => {
  if (!value) return 'http://127.0.0.1:4000'
  const trimmed = value.trim()
  if (!trimmed) return 'http://127.0.0.1:4000'
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed
}

const resolveImportMetaEnv = () => {
  try {
    return Function('return import.meta.env')()
  } catch (error) {
    return undefined
  }
}

const envSource = resolveImportMetaEnv() ?? (typeof process !== 'undefined' ? process.env : {})

export const runtimeConfig = {
  apiBaseUrl: normalizeBaseUrl(envSource?.VITE_API_BASE_URL),
  authToken: envSource?.VITE_AUTH_TOKEN,
}
