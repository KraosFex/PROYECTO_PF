const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      minlength: [4, 'El nombre debe tener al menos 3 caracteres']
    },
    username: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
      minlength: [4, 'El nombre de usuario debe tener al menos 3 caracteres']
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'El email no es valido']
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
        course: {
          type: Schema.ObjectId,
          ref: 'Course'
        }
      }
    ],
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 8 caracteres']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

userSchema.methods.generateTokenResetPassword = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}

userSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject()
  return user
}

module.exports = model('User', userSchema)
