const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
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
    role: {
        type: String,
        default: 'USER'
    },
    Image: {
        type: String,
        default: 'https://www.softzone.es/app/uploads/2018/04/guest.png?x=480&quality=20'
    }
}, {
    timestamps: true,
    versionKey: false,
})

userSchema.methods.toJSON = function () {
    const { password, __v, ...user } = this.toObject()
    return user
}

module.exports = model('User', userSchema)
