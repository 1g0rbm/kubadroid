import Loader from './src/services/loader/meduza/Loader'
import MeduzaApi from './src/services/api/meduza/MeduzaApi'
import { config } from 'dotenv'
import Speecher from './src/services/speech/Speecher'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as hndbrs from 'express-handlebars'
import router from './src/routes/Radio'


if (process.env.NODE_ENV !== 'production') {
  config()
}

const PORT = process.env.PORT || 3000
const DB_USER = process.env.DB_USER || 'db_user'
const DB_NAME = process.env.DB_NAME || 'db_name'
const DB_PASS = process.env.DB_PASS || 'db_pass'

const app = express()
const hbs = hndbrs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(router)

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@aiyoutuberadiodev-qtary.mongodb.net/${DB_NAME}`, {
      useNewUrlParser: true,
      useFindAndModify: false
    })

    app.listen(PORT, () => {
      console.log('server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()