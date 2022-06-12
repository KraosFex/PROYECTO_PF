// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./src/routes/index.js')
const errorHandler = require('./src/middleware/error.js')

// config
const app = express()
const port = process.env.PORT || 3001

const db = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cursos_db'

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(errorHandler)

// routes
app.use('/api/', router)

// conecc to DB & listen
const server = mongoose.connect(db,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server on port ${port} and connected to DB`)
    })
  }).catch(err => {
    console.log(err)
  })

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
