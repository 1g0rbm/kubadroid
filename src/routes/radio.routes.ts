import { Router } from 'express'
import News from '../models/News'

const radioRouter: Router = Router()

radioRouter.get('/', (req, res) => {
  res
  .status(200)
  .json({
    page: 'index'
  })
})

radioRouter.get('/on-air', (req, res) => {
  res
    .status(200)
    .json({
      page: 'on-air'
    })
})

radioRouter.get('/timetable', async (req, res) => {

  const news = await News.find({}).lean()

  res
    .status(200)
    .json({
      page: 'timetable',
      news: news
    })
})

export default radioRouter