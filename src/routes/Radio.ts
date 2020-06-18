import { Router } from 'express'

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

router.get('/timetable', (req, res) => {
  res.render('timetable', {
    title: 'Timetable',
    isTimeTable: true
  })
})

export default router