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

export async function login({ email, password }) {
  await wait()
  const user = users.get(email)
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password')
  }
  return {
    email,
    name: user.name,
    tier: user.tier,
    role: user.role,
    points: user.points,
    token: 'mock-token',
  }
}

export async function signUp({ email, password, name }) {
  await wait()
  if (users.has(email)) {
    throw new Error('Account already exists')
  }
  users.set(email, { password, name, tier: 'Explorer', role: 'traveler', points: 0 })
  return {
    email,
    name,
    tier: 'Explorer',
    role: 'traveler',
    points: 0,
    token: 'mock-token',
  }
}

export async function logout() {
  await wait(150)
  return true
}

export async function loginAdmin(credentials) {
  const profile = await login(credentials)
  if (profile.role !== 'admin') {
    throw new Error('Admin access required')
  }
  return profile
}
