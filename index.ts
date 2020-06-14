import { CronJob } from 'cron'
import Loader from './src/services/loader/meduza/loader'
import MeduzaApi from './src/services/api/meduza/MeduzaApi'

const meduzaLoader: Loader = new Loader(new MeduzaApi);

// const job: CronJob = new CronJob('* * * * * *', () => {
//     console.log('You will see this msg EVERY second');
// }, null, true, 'Europe/Moscow')

// job.start();

const app = async () => {
  const list = await meduzaLoader.load()

  console.log(list)
}

app();
