const { model, Schema } = require("mongoose");

const lessonSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    num: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
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
  },
  quiz: [
    {
      type: String
    }
  ],
  isLocked: {
    type: Boolean,
    default: true
  },
  answers: [
    {
      type: String
    }
  ]
}, { timestamps: true, versionKey: false })

module.exports = model("Lesson", lessonSchema);
