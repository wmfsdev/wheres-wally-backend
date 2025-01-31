
import prisma from "../tests/helpers/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

// const playerExists = await checkPlayerStatus(req.session.id)

// find player 

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
