import { Router } from 'express'

import { authRouter } from './modules/auth'
import { busesRouter } from './modules/buses'
import { flightsRouter } from './modules/flights'
import { holidaysRouter } from './modules/holidays'
import { hotelsRouter } from './modules/hotels'

export const router = Router()

router.use('/flights', flightsRouter)
router.use('/hotels', hotelsRouter)
router.use('/buses', busesRouter)
router.use('/holidays', holidaysRouter)
router.use('/auth', authRouter)
