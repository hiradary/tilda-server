import { Router } from 'express'
import passport from 'passport'

import controllers from 'controllers/auth'

const router = Router()
const { signIn, signUp, confirmSignUp } = controllers

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/confirmSignup', confirmSignUp)

export default router
