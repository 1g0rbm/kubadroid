import {Request, Response, Router} from 'express'
import News from "../models/News";
import auth from '../middlewares/auth.middleware'

const newsRouter: Router = Router()

newsRouter.get(
  '/list',
  auth,
  async (req: Request, res: Response) => {

    const page: number = req.query.page ? parseInt(req.query.page.toString()) : 1
    const limit: number = req.query.limit ? parseInt(req.query.limit.toString()) : 10
    const skip: number = page > 0 ? ((page - 1) * limit) : 0

    try {
      const total = await News.find().count()
      const items = await News.find().skip(skip).limit(limit).sort({createdAt: -1})

      res.json({items, total})
    } catch (e) {
      res.status(500)
        .json({
          message: 'Something went wrong. Try again later'
        })
    }
  })

export default newsRouter