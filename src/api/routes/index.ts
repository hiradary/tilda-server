import { Router } from 'express'

import authRoute from './auth'
import usersRoute from './users'
import resourcesRoute from './resources'

const router = Router()

router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/resources', resourcesRoute)

export default router
