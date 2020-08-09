import {Request, Response} from 'express'
import {verify} from 'jsonwebtoken'

export default (req: Request, res: Response, next: Function) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({message: 'unauthorized'})
    }

    const [type, value] = token.split(' ')

    req.headers.user = verify(value, process.env.JWT_SECRET || '').toString()
    next()
  } catch (e) {
    console.log('ERROR: ', e.message)

    return res
      .status(401)
      .json({message: 'unauthorized'})
  }
}
