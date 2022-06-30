// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { ServerApiVersion } = require('mongodb');
const cors = require('cors')
const router = require('./src/routes/index.js')
const errorHandler = require('./src/middleware/error.js')

// config
const app = express()
const port = process.env.PORT 
const db = process.env.MONGODB_URI 

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(errorHandler)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// routes
app.use('/api/', router)

// connect to DB & listen

const connectDB = () => {
  try {
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

    app.listen(port, () => {
      console.log(`Server on port ${port} and connected to DB 🔌`)
    })
  } catch (err) {
    console.log('Error al conectar a la db 🚫')
    console.error(err.message)
    process.exit(1)
  }
}

connectDB()

//

