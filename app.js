import express from 'express'
import gameRouter from './routes/gameRouter.js'
import leaderBoardRouter from './routes/leaderBoardRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.set('trust proxy', 1)

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/game", gameRouter)
app.use("/leaderboard", leaderBoardRouter)

export default app

