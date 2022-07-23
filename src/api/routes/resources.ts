import { Router } from 'express'

import { cryptocurrencies } from 'controllers/resources'

const router = Router()

router.get('/cryptocurrencies', cryptocurrencies.get)

export default router
