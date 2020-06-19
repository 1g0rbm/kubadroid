import { CronJob, time } from 'cron'
import Loader from '../services/loader/meduza/Loader'
import MeduzaApi from '../services/api/meduza/MeduzaApi'
import News from '../models/News'

const loader: Loader = new Loader(new MeduzaApi)

const job = new CronJob(
  '0 * * * *',
  maker
  ,
  null,
  true,
  'Europe/Moscow'
)

async function maker() {
  const news = await loader.load(10)
  news.map(async (item: ILoadableResponse) => {
    const record = await News.find({ type: 'news', title: item.title, filepath: null })

    if (record.length === 0) {
      const record = new News({
        type: 'news',
        title: item.title,
        text: item.text
      })

      await record.save()
    }
  })
}

export { maker }
export { job }