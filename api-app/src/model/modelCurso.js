const {Schema, model} = require('mongoose');

const courseSchema = new Schema({
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
})

module.exports = model('Course', courseSchema)