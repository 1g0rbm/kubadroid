import { Router } from 'express'
import News from '../models/News'

const router: Router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'kubadroid'
  })
})

router.get('/on-air', (req, res) => {
  res.render('on-air', {
    title: 'On Air',
    isOnAir: true
  })
})

router.get('/timetable', async (req, res) => {

  const news = await News.find({}).lean()

  res.render('timetable', {
    title: 'Timetable',
    isTimeTable: true,
    news
  })
})

export default router