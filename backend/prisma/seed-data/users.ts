export type UserSeed = {
  email: string
  name: string
  password: string
  tier: string
  role: 'traveler' | 'admin'
  points: number
}

export const userSeeds: UserSeed[] = [
  {
    email: 'traveler@example.com',
    name: 'Alex Traveler',
    password: 'password123',
    tier: 'Voyager Gold',
    role: 'traveler',
    points: 18400,
  },
  {
    email: 'admin@vyugo.com',
    name: 'VyuGo Control',
    password: 'vyugo-admin',
    tier: 'Operations Suite',
    role: 'admin',
    points: 0,
  },
]
