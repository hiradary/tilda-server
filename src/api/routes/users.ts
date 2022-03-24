import { Router } from 'express'

import { address, profile } from 'controllers/users'
import { withAuth } from 'api/middlewares/auth'

const router = Router()

router.get('/:username', profile.get)

router.post('/addresses', withAuth, address.create)
router.put('/addresses', withAuth, address.edit)

export default router
