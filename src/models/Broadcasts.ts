import { Schema, model, Types } from 'mongoose'

const schema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  news: [{
    type: Types.ObjectId,
    required: false,
    ref: 'News'
  }],
  onAirTimes: [{
    type: Date,
    required: true
  }],
})

export default model('Broadcasts', schema)