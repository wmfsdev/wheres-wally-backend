import express from 'express'

const app = express()

import indexRouter from './routes/indexRouter.js'

// sample route
app.use("/", indexRouter)

export default app