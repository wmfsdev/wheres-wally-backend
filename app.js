const express = require('express')
const app = express()

const indexRouter = require("./routes/indexRouter")

// sample route
app.use("/", indexRouter)

module.exports = app