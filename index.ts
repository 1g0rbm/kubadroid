import * as express from 'express'
import * as mongoose from 'mongoose'
import * as hndbrs from 'express-handlebars'
import router from './src/routes/Radio'
import { config } from 'dotenv'
import { newsmaker } from './src/crons/NewsMaker'
import { voiceover } from './src/crons/Voiceover'
import moment = require('moment')


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
  extname: 'hbs',
  helpers: {
    trimStr: (string: string, length: number) => string.substring(0, length) + '...',
    formatDate: (date: Date, format: string) => moment(date).format(format)
  }
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

    newsmaker.job().start()
    voiceover.job().start()

    app.listen(PORT, () => {
      console.log('server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()