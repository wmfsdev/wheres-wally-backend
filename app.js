import express from 'express'
import gameRouter from './routes/gameRouter.js'
import leaderBoardRouter from './routes/leaderBoardRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.set('trust proxy', 1)

app.use(cors({
    origin: 'https://wheres-wally-frontend-xi.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization', 'X-Content-Type-Options', 'Accept', 'X-Requested-With', 'Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Access-Control-Allow-Methods'],
    exposedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization', 'X-Content-Type-Options', 'Accept', 'X-Requested-With', 'Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Access-Control-Allow-Methods'],
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

