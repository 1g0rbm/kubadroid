import { Schema, model } from 'mongoose'

const schema: Schema = new Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: false,
    default: null
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  isPublished: {
    type: Boolean,
    required: false,
    default: false
  }
})

export default model('News', schema)