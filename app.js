import express from 'express'
import indexRouter from './routes/indexRouter.js'
import gameRouter from './routes/gameRouter.js'

const app = express()

// sample route
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter)
app.use("/game", gameRouter)

export default app