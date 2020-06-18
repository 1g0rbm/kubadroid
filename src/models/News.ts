import { Schema, model } from 'mongoose'

const schema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: true
  }
})

export default model('News', schema)