const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    estado: {
      type: Boolean,
      default: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    Image: {
      type: String,
      default:
        'https://www.softzone.es/app/uploads/2018/04/guest.png?x=480&quality=20'
    },
    courses: [
      {
        favoritos: {
          type: Schema.ObjectId,
          ref: 'Course'
        }
      }
    ],
    clases: [
      {
        completadas: {
          type: Schema.ObjectId,
          ref: 'Clase'
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.methods.toJSON = function () {
  const { password, __v, ...user } = this.toObject()
  return user
}

module.exports = model('User', userSchema)
