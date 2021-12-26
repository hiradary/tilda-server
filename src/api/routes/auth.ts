import { Router } from 'express'
import passport from 'passport'
import {
  Strategy as JwtStrategy,
  ExtractJwt as ExtractJwt,
  StrategyOptions,
} from 'passport-jwt'

import controllers from 'controllers/auth'
import config from 'config'
import { User } from 'models/user'

const router = Router()
const { jwt } = config
const { signIn, signUp } = controllers

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt.secret,
}

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    console.log({ payload })
    User.findOne({ id: payload.sub }, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
        // or you could create a new account
      }
    })
  }),
)

router.post('/signup', signUp)
router.post('/signin', signIn)

export default router
