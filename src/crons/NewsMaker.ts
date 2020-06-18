import { CronJob } from 'cron'
import Loader from '../services/loader/meduza/Loader'
import MeduzaApi from '../services/api/meduza/MeduzaApi'

const loader: Loader = new Loader(new MeduzaApi)

const job = new CronJob(
  '0 10/9 * * *',
  async () => {
    const news = await loader.load()
    
  },
  null,
  true,
  'Europe/Moscow'
)