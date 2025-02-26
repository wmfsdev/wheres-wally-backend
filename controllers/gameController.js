
import { getCoordinateMatchStatus, checkPlayerStatus, createPlayerConnectSession, getImageCoordinates, incrementFoundCoordinates, extractSid, calculateGameRuntime } from "../utils/helper.js";
import prisma from "../libs/prisma.js";


async function post_check_coordinates(req, res, next) {
  console.log("check coordinates")
  const imageId = req.params.id
  const characterNameId = req.body.character
  const { x, y } = req.body.coordinates
  const sid = extractSid(req.cookies['connect.sid'])
  
  const playerExists = await checkPlayerStatus(sid)

  if (!playerExists) {
    createPlayerConnectSession(sid)
  } // otherwise there is a player and carry on...
  
  // 1.  check user coordinates against those stored in database - uses :id param to identify which image and whatever the input method happens to be (user click)
  const { storedXCoordinate, storedYCoordinate } = await getImageCoordinates(imageId, characterNameId)

  // 2. function(user input from front end) NORMALISE coordinates
  // 3. check normalised coordinates against db query within acceptable range
  const coordinateMatchStatus = getCoordinateMatchStatus(storedXCoordinate, storedYCoordinate, x, y) // correct: x: 15, y: 25

  // 4. if they match
  if (coordinateMatchStatus) {
    console.log("coordinates match")
    // increment player's FoundCoordinates counter +1
    const foundCoordinateCount = await incrementFoundCoordinates(sid)
    // WIN CHECK
    if (foundCoordinateCount === 2) {
      console.log("WIN")
      const gameRuntime = await calculateGameRuntime(sid)
      return res.status(200).json({ status: "win!", gameRuntime: gameRuntime, playerId: sid  })
    }
    return res.status(200).json({ status: "found element", gameRuntime: null})
  } else {
    console.log("didn't match:(")
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
  console.log("put_player_name")
  const { playerId, gameRuntime, playerName, boardId } = req.body

  if (gameRuntime) {
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
    return
  } else {
    const [one, two] = await prisma.$transaction([
      prisma.player.update({
        where: {
          sessionId: playerId
        },
        data: {
          name: playerName,
          gameLength: gameRuntime,
          board: boardId
        }
      }),
      prisma.session.delete({
        where: {
          sid: playerId
        }
      })
    ])
    res.status(200).json()
  }
}

export { post_check_coordinates, getImage, put_player_gametime, put_player_name }