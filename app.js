import express from 'express'
import gameRouter from './routes/gameRouter.js'
import leaderBoardRouter from './routes/leaderBoardRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.set("trust proxy", 1);
    
app.use(cors({
    origin: 'https://wheres-wally-frontend-xi.vercel.app',
    allowedHeaders: ["Content-Type", "Connection", "Accept", "Origin"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/game", gameRouter)
app.use("/leaderboard", leaderBoardRouter)

export default app

