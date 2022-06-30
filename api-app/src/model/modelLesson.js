const { model, Schema } = require('mongoose')

const lessonSchema = new Schema({
  num: {
    type: Number,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  video: String,
  quiz:  Object,
  last: {
          type: Boolean,
          default: false
        },
}, { timestamps: true, versionKey: false })

module.exports = model('Lesson', lessonSchema)
