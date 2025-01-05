import { Router } from "express"
import { test } from '../controllers/gameController.js'

import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import prisma from "../libs/prisma.js"

const createSession = expressSession({
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

const gameRouter = Router()

gameRouter.post('/new', createSession, test)
// this uses req.params

gameRouter.get('/')

// POST request will create the session since the user will pick from a range of images and submit the choice

// GET for requesting selected image
// POST for submitting coordinates (user click)

export default gameRouter