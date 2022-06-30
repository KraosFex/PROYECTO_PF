
const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
      required: false
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
          ref: 'Lesson',
          autopopulate: true
        },
      }
    ],
    userVotes: [
      {
        user: {
          type: Schema.ObjectId,
          ref: 'User'
        }
      }
    ],
    votes: [
      Number
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

courseSchema.plugin(require('mongoose-autopopulate'))
courseSchema.plugin(mongoosePaginate)

module.exports = model('Course', courseSchema)
