import { Router } from "express"
import {  getImage, post_check_coordinates, test } from '../controllers/gameController.js'
// connectPlayerSessionRelation
// createPlayer,createCoordinates,
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import prisma from "../libs/prisma.js"

const createSession = expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: 'http://localhost:5173',
       secure: false,
       httpOnly: false,
      // overwrite: false
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

function log(req, res, next) {
   console.log("middle")
   console.log(req.headers)
   next()
}

gameRouter.use('/board', log, createSession)
// gameRouter.get('/board/coord', createCoordinates)

gameRouter.get('/getimage', getImage)

gameRouter.post('/board/:id', post_check_coordinates) // POST

gameRouter.get('/board/createplayer', test)

// POST request will create the session since the user will pick from a range of images and submit the choice

// GET for requesting selected image
// POST for submitting coordinates (user click)

export default gameRouter