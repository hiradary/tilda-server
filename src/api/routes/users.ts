import { Router } from 'express'

import { address } from 'controllers/users'

const router = Router()

router.post('/addresses', address.create)

export default router
