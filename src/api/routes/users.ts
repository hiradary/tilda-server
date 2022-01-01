import { Router } from 'express'

import { address } from 'controllers/users'
import { withAuth } from 'api/middlewares/auth'

const router = Router()

router.post('/addresses', withAuth, address.create)

export default router
