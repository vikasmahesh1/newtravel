import { Router } from 'express'
import { z } from 'zod'

import { validateBody } from '../../middleware/validateRequest'
import { getHolidayById, searchHolidays } from '../../services/holidaysService'

const searchSchema = z.object({
  theme: z.string().optional(),
  destination: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  travelers: z.number().int().positive().optional(),
  budget: z.number().int().positive().optional(),
  market: z.string().optional(),
})

export const holidaysRouter = Router()

holidaysRouter.post('/search', validateBody(searchSchema), async (req, res, next) => {
  try {
    const response = await searchHolidays(req.body)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

holidaysRouter.get('/:id', async (req, res, next) => {
  try {
    const holiday = await getHolidayById(req.params.id)
    if (!holiday) {
      return res.status(404).json({ message: 'Holiday package not found' })
    }
    res.json(holiday)
  } catch (error) {
    next(error)
  }
})
