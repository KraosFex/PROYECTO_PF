const { model, Schema } = require('mongoose')

const lessonSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, versionKey: false })

module.exports = model('Lession', lessonSchema)
