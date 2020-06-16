import { TextToSpeechClient } from '@google-cloud/text-to-speech/build/src/v1'
import { writeFile, existsSync, mkdirSync } from 'fs'
import { promisify } from 'util'
import moment = require('moment')

export default class Speecher {

  private readonly client: TextToSpeechClient

  constructor(client: TextToSpeechClient) {
    this.client = client
  }

  public async createSpeech(requestParams: ISpeachParameters, dir?: string): Promise<string> {
    const [{ audioContent }] = await this.client.synthesizeSpeech({
      input: { text: requestParams.text },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0,
        speakingRate: 1
      },
      voice: { languageCode: requestParams.langCode, name: requestParams.speakerName }
    })

    if (!audioContent) {
      throw Error('[Google] Could not receive audio')
    }

    const dirPath = `${process.cwd()}/sounds/${moment().format('DD-MM-YYYY')}`

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath)
    }

    const filePath = `${dirPath}/${Date.now()}.mp3`
    const wf = promisify(writeFile)
    await wf(filePath, audioContent, 'binary')

    return filePath
  }
}