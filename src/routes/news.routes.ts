import {Request, Response, Router} from 'express'
import News from "../models/News";
import auth from '../middlewares/auth.middleware'
import {existsSync, unlinkSync} from 'fs'
import Speecher from '../services/speech/Speecher'
import TextToSpeechClient from '@google-cloud/text-to-speech'

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

      return res.json({items, total})
    } catch (e) {
      return res.status(500)
        .json({
          message: 'Something went wrong. Try again later'
        })
    }
  })

newsRouter.post(
  '/approve/:id',
  auth,
  async (req: Request, res: Response) => {
    try {
      const {id} = req.params
      const news = await News.findOne({_id: id})

      if (news === null) {
        return res.status(404)
          .json({
            message: `News with id = "${id}" not found`
          })
      }

      const value = !news.get('approved')
      const message = value ? 'News were approved' : 'News were unapproved'

      news.set('approved', value).save()

      return res.json({message, approved: value})
    } catch (e) {
      return res.status(500)
        .json({
          message: e.message
        })
    }
  })

newsRouter.delete(
  '/:id',
  auth,
  async (req: Request, res: Response) => {
    try {
      const {id} = req.params
      const news = await News.findOneAndRemove({_id: id})

      if (news && existsSync(news.get('filepath'))) {
        unlinkSync(news.get('filepath'))
      }

      res.json({message: 'news were deleted'})
    } catch (e) {
      res.status(500)
        .json({
          message: 'Something went wrong. Try again later'
        })
    }
  })

newsRouter.post(
  '/edit/:id',
  auth,
  async (req: Request, res: Response) => {
    try {
      const {data} = req.body
      const {id} = req.params

      await News.update({_id: id}, {$set: data})

      return res.json({message: 'news were updated'})
    } catch (e) {
      console.log('ERR: ', e.message)
      return res.status(500)
        .json({
          message: 'Something went wrong. Try again later'
        })
    }
  })

newsRouter.post(
  '/vocalize/:id',
  auth,
  async (req: Request, res: Response) => {
    try {
      const {id} = req.params
      const news = await News.findById(id)

      if (news === null) {
        return res.status(404)
          .json({
            message: `News with id = "${id}" not found`
          })
      }

      if (news.get('filepath') !== null) {
        return res.json({
          message: 'Filepath already exist',
          filepath: news.get('filepath')
        })
      }

      const speecher: Speecher = new Speecher(new TextToSpeechClient.TextToSpeechClient())
      const filepath: string = await speecher.createSpeech({
        text: news.get('text'),
        langCode: 'ru-RU',
        speakerName: 'ru-RU-Wavenet-D'
      })

      news.set('filepath', filepath).save()

      return res.json({message: 'Vocalize was created', filepath})
    } catch (e) {
      res.status(500)
        .json({
          message: e.message
        })
    }
  })

export default newsRouter