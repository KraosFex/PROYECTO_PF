
const { Schema, model } = require('mongoose')

const courseSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    calificacion: {
      type: Number,
      required: true
    },
    imagen: {
      type: String,
      required: true
    },
    userInscript: {
      type: Number
    },
    lessions: [
      {
        lesson: {
          type: Schema.ObjectId,
          ref: 'Lession'
        }
      }
    ],
    lenguaje: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Course', courseSchema)
