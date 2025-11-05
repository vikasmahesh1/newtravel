import { Router } from 'express'
import { z } from 'zod'

import { validateBody } from '../../middleware/validateRequest'
import { getHotelById, searchHotels } from '../../services/hotelsService'

const searchSchema = z.object({
  destination: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().int().positive().optional(),
  rooms: z.number().int().positive().optional(),
  market: z.string().optional(),
})

export const hotelsRouter = Router()

hotelsRouter.post('/search', validateBody(searchSchema), async (req, res, next) => {
  try {
    const response = await searchHotels(req.body)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

hotelsRouter.get('/:id', async (req, res, next) => {
  try {
    const hotel = await getHotelById(req.params.id)
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }
    res.json(hotel)
  } catch (error) {
    next(error)
  }
})
