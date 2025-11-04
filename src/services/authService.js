const users = new Map([
  [
    'traveler@example.com',
    {
      password: 'password123',
      name: 'Alex Traveler',
      tier: 'Voyager Gold',
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
    token: 'mock-token',
  }
}

export async function signUp({ email, password, name }) {
  await wait()
  if (users.has(email)) {
    throw new Error('Account already exists')
  }
  users.set(email, { password, name, tier: 'Explorer' })
  return {
    email,
    name,
    tier: 'Explorer',
    token: 'mock-token',
  }
}

export async function logout() {
  await wait(150)
  return true
}
