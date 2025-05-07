
import { getCoordinateMatchStatus, checkPlayerStatus, createPlayerConnectSession, getImageCoordinates, incrementFoundCoordinates, extractSid, calculateGameRuntime } from "../utils/helper.js";
import prisma from "../libs/prisma.js";
import { validationResult } from 'express-validator'
import { Prisma } from "@prisma/client";


async function post_check_coordinates(req, res, next) {
  const imageId = req.params.id
  const characterNameId = req.body.character
  const { x, y } = req.body.coordinates
  const sid = extractSid(req.cookies['connect.sid'])
  const playerExists = await checkPlayerStatus(sid)

  if (!playerExists) {
    createPlayerConnectSession(sid)
  }
  
  const { storedXCoordinate, storedYCoordinate } = await getImageCoordinates(imageId, characterNameId)

  const coordinateMatchStatus = getCoordinateMatchStatus(storedXCoordinate, storedYCoordinate, x, y)

  if (coordinateMatchStatus) {
    const foundCoordinateCount = await incrementFoundCoordinates(sid)
    
    if (foundCoordinateCount === 4) {
      const gameRuntime = await calculateGameRuntime(sid)
      return res.status(200).json({ status: "win!", gameRuntime: gameRuntime, playerId: sid  })
    }

    return res.status(200).json({ status: "found element", gameRuntime: null})
  } else {
    return res.status(200).json({ status: "no element found", gameRuntime: null })
  }
}

async function getImage(req, res, next) {
  const { storedXCoordinate, storedYCoordinate } = await getImageCoordinates()
  res.status(200).json()
}

async function put_player_gametime(req, res, next) {
  const { playerId, gameRuntime } = req.body

  const response = await prisma.player.update({
    where: {
      sessionId: playerId
    },
    data: {
      gameLength: gameRuntime
    }
  })
}

async function put_player_name(req, res, next) {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error('validation failed');
      err.statusCode = 422;
      err.data = errors.array();
      throw err;
    }

    const { playerId, gameRuntime, playerName, boardId } = req.body

    await prisma.player.update({
      where: {
        sessionId: playerId
      },
      data: {
        name: playerName,
        gameLength: gameRuntime,
        board: boardId
      }
    })
    res.status(200).json()

  } catch(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).end()
      return
    }
    const status = error.statusCode
    const data = error.data
    res.status(status).json(data) 
  }
}

export { post_check_coordinates, getImage, put_player_gametime, put_player_name }