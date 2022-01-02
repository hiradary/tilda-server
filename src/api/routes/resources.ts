import { Router } from 'express'

import { getAllResources } from 'controllers/resources'

const router = Router()

router.get('/', getAllResources)

export default router