import { CronJob } from 'cron'
import Loader from './src/services/loader/meduza/Loader'
import MeduzaApi from './src/services/api/meduza/MeduzaApi'
import { config } from 'dotenv'
import Speecher from './src/services/speech/Speecher'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

if (process.env.NODE_ENV !== 'production') {
  config()
}

const meduzaLoader: Loader = new Loader(new MeduzaApi);
const speecher: Speecher = new Speecher(new TextToSpeechClient())


// const job: CronJob = new CronJob('* * * * * *', () => {
//     console.log('You will see this msg EVERY second');
// }, null, true, 'Europe/Moscow')

// job.start();

const app = async () => {

  const list = await meduzaLoader.load();

  console.log(list[9]);

  const filepath = await speecher.createSpeech({
    text: list[9],
    langCode: 'ru-RU',
    speakerName: 'ru-RU-Wavenet-D'
  });

  console.log(filepath)
}

app();
