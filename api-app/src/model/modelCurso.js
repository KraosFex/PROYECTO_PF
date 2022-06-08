const {Schema, model} = require('mongoose');

const courseSchema = new Schema({
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
        required: true,
    },
    userInscrip: {
        type: Number,
    },
    clases: {
        type: [String],
    }
}, {
    timestamps: true,
    versionKey: false,
})


module.exports = model('Course', courseSchema)
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classes: {
        type: Array,
        required: true,
        validate: c => c.length > 0
    }

module.exports = model('Course', courseSchema)
