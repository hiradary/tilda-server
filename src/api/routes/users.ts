import { Router } from 'express'

import { address, profile } from 'controllers/users'
import { withAuth } from 'api/middlewares/auth'

const router = Router()

router.get('/profile/:username', profile.get)
router.get('/profile', withAuth, profile.getMine)
router.put('/profile', withAuth, profile.update)

router.post('/addresses', withAuth, address.create)
router.put('/addresses', withAuth, address.update)

export default router
