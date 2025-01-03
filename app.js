import express from 'express'
import indexRouter from './routes/indexRouter.js'
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import prisma from './libs/prisma.js'

const app = express()

// sample route
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(expressSession({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        prisma,
        {
           checkPeriod: 2 * 60 * 1000,
           dbRecordIdIsSessionId: true,
           dbRecordIdFunction: undefined,
        }
    )
})
)

app.use("/", indexRouter)

export default app