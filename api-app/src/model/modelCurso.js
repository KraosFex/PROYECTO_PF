
const { Schema, model } = require('mongoose')

const courseSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El titulo es requerido']
    },
    descripcion: {
      type: String,
      required: [true, 'La descripcion es requerida']
    },
    calificacion: {
      type: Number,
      required: [true, 'La calificacion es requerida']
    },
    imagen: {
      type: String,
      required: [true, 'La imagen es requerida']
    },
    userInscript: {
      type: Number
    },
    lessons: [
      {
        lesson: {
          type: Schema.ObjectId,
          ref: 'Lesson'
        }
      }
    ],
    lenguaje: {
      type: String,
      required: [true, 'El lenguaje es requerido']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Course', courseSchema)
