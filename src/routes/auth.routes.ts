import {Request, Response, Router} from 'express'
import User from '../models/User'
import {compare, hash} from 'bcryptjs'
import {check, cookie, validationResult} from 'express-validator'
import {sign, verify} from 'jsonwebtoken'

const authRouter: Router = Router()

authRouter.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Min password length must be 6 symbols').isLength({min: 6})
  ],
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            errors: errors.array(),
            message: 'Invalid registration data'
          })
      }

      const {name, email, password} = req.body

      const candidate = await User.findOne({email})
      if (candidate) {
        return res
          .status(400)
          .json({
            message: 'User already exist'
          })
      }

      const passwordHash: string = await hash(password, 12)
      const user = new User({name, email, password: passwordHash})

      await user.save()

      return res
        .status(201)
        .json({
          message: 'User has been created'
        })
    } catch (e) {
      console.log(e.message)
      return res
        .status(500)
        .json({
          message: 'Something went wrong. Try again later'
        })
    }
  })

authRouter.post(
  '/login',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Min password length must be 6 symbols').isLength({min: 6})
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            errors: errors.array(),
            message: 'Invalid login data'
          })
      }

      const {email, password} = req.body

      const user = await User.findOne({email})
      if (!user) {
        return res
          .status(400)
          .json({message: 'Wrong user or password'})
      }

      const isMatch: boolean = await compare(password, user.get('password'))
      if (!isMatch) {
        return res
          .status(400)
          .json({message: 'Wrong user or password'})
      }

      const token = sign(
        {userId: user.get('id')},
        process.env.JWT_SECRET || '',
        {expiresIn: '2h'}
      )

      const refresh = sign(
        {userId: user.get('id'), token},
        process.env.JWT_SECRET || '',
        {expiresIn: '7d'}
      )

      return res
        .cookie(
          'refresh',
          refresh,
          {expires: new Date('+7d'), httpOnly: true, path: '/'}
        )
        .json({
          token,
          userId: user.get('id')
        })
    } catch (e) {
      return res
        .status(500)
        .json({
          message: 'Something went wrong. Try again later'
        })
    }
  })

authRouter.post(
  '/refresh',
  async (req: Request, res: Response) => {
    const refresh = req.cookies.refresh

    if (typeof refresh === 'undefined') {
      return res.status(401)
    }

    const {userId}: any = verify(refresh, process.env.JWT_SECRET || '')

    const user = await User.findById(userId)
    if (!user) {
      return res
        .status(400)
        .json({message: 'wrong refresh token'})
    }

    const token = sign(
      {userId},
      process.env.JWT_SECRET || '',
      {expiresIn: '2h'}
    )

    const newRefresh = sign(
      {userId: user.get('id'), token},
      process.env.JWT_SECRET || '',
      {expiresIn: '7d'}
    )

    return res
      .cookie(
        'refresh',
        newRefresh,
        {expires: new Date('+7d'), httpOnly: true, path: '/'}
      )
      .json({token, userId})
  })

export default authRouter