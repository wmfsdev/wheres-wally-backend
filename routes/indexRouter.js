import { Router } from "express"
import { sampleController, createUser } from '../controllers/indexController.js'

const indexRouter = Router()

// sample path and middleware
indexRouter.get("/", sampleController)

indexRouter.get("/", createUser)

// POST for submitting coordinates (user click)

export default indexRouter