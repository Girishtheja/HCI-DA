const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')
const requestRoutes = require('./routes/request')
const mongoose = require('mongoose')
const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.use("/answer", answerRoutes)
app.use("/user", userRoutes)
app.use("/question", questionRoutes)
app.use("/request", requestRoutes)

mongoose
  .connect('mongodb://127.0.0.1:27017/decode')
  .then(result => {
    console.log("mongodb connected")
    app.listen(5000, () => {
      console.log(`Server connected AT ${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
