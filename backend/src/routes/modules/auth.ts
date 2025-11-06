import { Router } from 'express'
import { z } from 'zod'

import { validateBody } from '../../middleware/validateRequest'
import { login, loginAdmin, logout, signUp } from '../../services/authService'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const signupSchema = credentialsSchema.extend({
  name: z.string().min(2),
})

export const authRouter = Router()

authRouter.post('/login', validateBody(credentialsSchema), async (req, res, next) => {
  try {
    const profile = await login(req.body)
    res.json(profile)
  } catch (error) {
    next(error)
  }
})

authRouter.post('/signup', validateBody(signupSchema), async (req, res, next) => {
  try {
    const profile = await signUp(req.body)
    res.status(201).json(profile)
  } catch (error) {
    next(error)
  }
})

authRouter.post('/logout', async (_req, res, next) => {
  try {
    await logout()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

authRouter.post('/admin/login', validateBody(credentialsSchema), async (req, res, next) => {
  try {
    const profile = await loginAdmin(req.body)
    res.json(profile)
  } catch (error) {
    next(error)
  }
})
