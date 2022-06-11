const { model, Schema } = require('mongoose')

const lessionSchema = new Schema({
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

module.exports = model('Lession', lessionSchema)
