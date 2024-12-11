const { Router } = require("express")
const { sampleController } = require("../controllers/indexController")
const indexRouter = Router()

// sample path and middleware
indexRouter.get("/", sampleController)

module.exports = indexRouter