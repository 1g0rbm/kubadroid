import News from '../models/News'
import { CronJob } from 'cron'
import Speecher from '../services/speech/Speecher'
import TextToSpeechClient from '@google-cloud/text-to-speech'

export namespace voiceover {
  const speecher: Speecher = new Speecher(new TextToSpeechClient.TextToSpeechClient())

  export function job(): CronJob {
    console.log('Job voiceover has been started...')
    return new CronJob(
      '0 0/8 * * *',
      maker,
      null,
      true,
      'Europe/Moscow'
    )
  }

  export async function maker() {
    const news = await News.find({
      filepath: null,
      type: 'news'
    })

    news.map(async (item): Promise<void> => {
      const path: string = await speecher.createSpeech({
        text: item.get('title'),
        langCode: 'ru-RU',
        speakerName: 'ru-RU-Wavenet-D'
      })

      item
        .set('filepath', path)
        .save()
    })
  }
}