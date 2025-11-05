import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { env } from '../config/env'
import { prisma } from '../lib/prisma'
import { HttpError } from '../middleware/errorHandler'

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  email: string
  password: string
  name: string
}

export type AuthProfile = {
  email: string
  name: string
  tier: string
  role: string
  points: number
  token: string
}

const toProfile = (user: { id: string; email: string; name: string; tier: string; role: string; points: number }) => {
  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: '2h' })
  return {
    email: user.email,
    name: user.name,
    tier: user.tier,
    role: user.role,
    points: user.points,
    token,
  }
}

export const login = async ({ email, password }: LoginPayload): Promise<AuthProfile> => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new HttpError(401, 'Invalid email or password')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new HttpError(401, 'Invalid email or password')
  }
  return toProfile(user)
}

export const signUp = async ({ email, password, name }: SignupPayload): Promise<AuthProfile> => {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new HttpError(409, 'Account already exists')
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      tier: 'Explorer',
      role: 'traveler',
      points: 0,
    },
  })

  return toProfile(user)
}

export const logout = async () => true

export const loginAdmin = async ({ email, password }: LoginPayload): Promise<AuthProfile> => {
  const profile = await login({ email, password })
  if (profile.role !== 'admin') {
    throw new HttpError(403, 'Admin access required')
  }
  return profile
}
