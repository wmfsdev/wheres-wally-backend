import express from 'express'
import gameRouter from './routes/gameRouter.js'
import leaderBoardRouter from './routes/leaderBoardRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.options('/*', cors())

app.use(cors({
    origin: 'https://wheres-wally-frontend-xi.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
}))

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://wheres-wally-frontend-xi.vercel.app"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Max-Age", 7200);
    next();
  });

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/game", gameRouter)
app.use("/leaderboard", leaderBoardRouter)

export default app

