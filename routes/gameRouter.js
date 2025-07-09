import { Router } from "express"
import { post_check_coordinates, put_player_name } from '../controllers/gameController.js'
import expressSession, { Store } from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import prisma from "../libs/prisma.js"
import { conditionalCookieDestroy } from "../utils/helper.js"
import { body } from 'express-validator'

const createSession = expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: 'wheres-wally-frontend-xi.vercel.app',
      secure: true,
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

gameRouter.get('/board/:id', conditionalCookieDestroy, createSession)

gameRouter.put('/player', [
  body('playerName')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Character length must be between 1 and 10'),
  body('gameRuntime')
    .isInt().optional(),
], put_player_name)

gameRouter.post('/board/:id', post_check_coordinates)

export default gameRouter