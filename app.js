import express from 'express'
import indexRouter from './routes/indexRouter.js'

const app = express()

// sample route
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter)

export default app