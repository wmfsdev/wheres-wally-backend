import prisma from '../libs/prisma.js'

async function checkPlayerStatus(id) {
  console.log("check player status")
  const player = await prisma.player.findUnique({
    where: {
      sessionId: id
    }
  })

  if (player === null) {
    return false
  } else return true 
}

async function createPlayerConnectSession(sessionId) {
  console.log("sessionId: ", sessionId)
  const player = await prisma.player.create({
    data: {
      session: {
        connect: { id: sessionId }
      }
    }
  })
  console.log(player)
}

async function getImageCoordinates(imageId, characterNameId) {
  console.log("getImageCoordinates")

  const values = await prisma.imageBoard.findUnique({
    where: {
      name: imageId
    },
    select: {
      character: {
        where: {
          characterName: characterNameId,
        },
        select: {
          coordinates: true
        }
      }
    }
  })
  const storedXCoordinate = values.character[0].coordinates[0].coordinates[0]
  const storedYCoordinate = values.character[0].coordinates[0].coordinates[1]
  return { storedXCoordinate, storedYCoordinate}
}

function getCoordinateMatchStatus(coordinateX, coordinateY, clickX, clickY) {
  // if the difference between clickX and storedX is greater than 10? it's not in range
  const lowEndX = coordinateX - 20
  const highEndX = coordinateX + 21
        
  const lowEndY = coordinateY - 20
  const highEndY = coordinateY + 21
    
  let coordinateMatchStatus = false
  // if clickX (15) exists between low and high end ( 15 and 25 )
  // then check clickY (15) exists between low and high end ( 15 and 25 )
  for ( let i = lowEndX ; i !== highEndX ; i++ ) {
    if (i === clickX) {
      for ( let c = lowEndY ; c !== highEndY ; c++ ) {
        if (c === clickY) {
          coordinateMatchStatus = true
        }
      }
    }
  }
  return coordinateMatchStatus
}

async function incrementFoundCoordinates(sessionId) {

  const player = await prisma.player.update({
    where: {
      sessionId: sessionId
    },
    data: {
      foundCoordinates: { increment: 1 }
    }
  })
  return player.foundCoordinates
}

function extractSid(cookie) {
  const sid = cookie.split(/:|\./)[1]
  return sid
}


async function calculateGameRuntime(sid) {
  const { createdAt } = await prisma.session.findUnique({
    where: { id: sid },
    select: {
      createdAt: true
    }
  })

  const startTime = new Date(createdAt)
  const endTime = new Date()
  const duration = (endTime - startTime) / 1000
  return Math.floor(duration)
}

async function conditionalCookieDestroy(req, res, next) {
  console.log("DESTROY")
 
  if (req.cookies['connect.sid'] !== undefined && req.method === 'GET') {
    const sid = extractSid(req.cookies['connect.sid'])

    await prisma.session.deleteMany({
      where: {
        sid: sid
      }
    })
  }
  next()
} 

export { getCoordinateMatchStatus, checkPlayerStatus, createPlayerConnectSession, getImageCoordinates, incrementFoundCoordinates, extractSid, calculateGameRuntime, conditionalCookieDestroy }