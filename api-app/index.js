// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const router = require('./src/routes/index.js')
const errorHandler = require('./src/middleware/error.js')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');




// config
const app = express()
const port = process.env.PORT || 3001
const db = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cursos_db'

// middlewares
//app.use(express.json())
//app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(errorHandler)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});*/

// routes
//app.use('/api/', router)

app.get('/', (req, res) => {
  res.send("HOME ESTOY ACA")
})

app.listen(port, () => {
  console.log(`Server on port ${port} and connected to DB 🔌`)
}) 



// connect to DB & listen

/*const connectDB = () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(port, () => {
      console.log(`Server on port ${port} and connected to DB 🔌`)
    })
  } catch (err) {
    console.log('Error al conectar a la db 🚫')
    console.error(err.message)
    process.exit(1)
  }
}

connectDB()*/

//
