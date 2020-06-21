import * as express from 'express'
import * as mongoose from 'mongoose'
import radioRouter from './src/routes/radio.routes'
import authRouter from './src/routes/auth.routes'
import { config } from 'dotenv'
import { newsmaker } from './src/crons/NewsMaker'
import { voiceover } from './src/crons/Voiceover'

config()

const PORT = process.env.APP_PORT || 3000
const DB_USER = process.env.DB_USER || 'db_user'
const DB_NAME = process.env.DB_NAME || 'db_name'
const DB_PASS = process.env.DB_PASS || 'db_pass'

const app = express()

app.use('/api/auth', authRouter)
app.use('/api/radio', radioRouter)

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@aiyoutuberadiodev-qtary.mongodb.net/${DB_NAME}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    newsmaker.job().start()
    voiceover.job().start()

    app.listen(PORT, () => {
      console.log(`server has been started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start()