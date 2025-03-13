import express from 'express'
import gameRouter from './routes/gameRouter.js'
import leaderBoardRouter from './routes/leaderBoardRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: 'https://wheres-wally-frontend-xi.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "https://wheres-wally-frontend-xi.vercel.app");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();  
 }); 

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/game", gameRouter)
app.use("/leaderboard", leaderBoardRouter)

export default app

