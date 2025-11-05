import { Router } from 'express'
import { z } from 'zod'

import { validateBody } from '../../middleware/validateRequest'
import { getBusById, searchBuses } from '../../services/busesService'

const searchSchema = z.object({
  origin: z.string().optional(),
  destination: z.string().optional(),
  date: z.string().optional(),
  passengers: z.number().int().positive().optional(),
  market: z.string().optional(),
})

export const busesRouter = Router()

busesRouter.post('/search', validateBody(searchSchema), async (req, res, next) => {
  try {
    const response = await searchBuses(req.body)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

busesRouter.get('/:id', async (req, res, next) => {
  try {
    const bus = await getBusById(req.params.id)
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' })
    }
    res.json(bus)
  } catch (error) {
    next(error)
  }
})
