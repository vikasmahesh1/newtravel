import { Router } from 'express'
import { z } from 'zod'

import { validateBody } from '../../middleware/validateRequest'
import { getFlightById, searchFlights } from '../../services/flightsService'

const searchSchema = z.object({
  origin: z.string().optional(),
  destination: z.string().optional(),
  date: z.string().optional(),
  passengers: z.number().int().positive().optional(),
  cabin: z.string().optional(),
  market: z.string().optional(),
})

export const flightsRouter = Router()

flightsRouter.post('/search', validateBody(searchSchema), async (req, res, next) => {
  try {
    const response = await searchFlights(req.body)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

flightsRouter.get('/:id', async (req, res, next) => {
  try {
    const flight = await getFlightById(req.params.id)
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' })
    }
    res.json(flight)
  } catch (error) {
    next(error)
  }
})
