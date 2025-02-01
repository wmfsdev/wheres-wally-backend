import prisma from '../libs/prisma.js'

async function checkPlayerStatus(id) {
  console.log("check player status")
  console.log("id: ", id)
  
  const player = await prisma.player.findUnique({
    where: {
      sessionId: id
    }
  })
  console.log("player found status: ", player)
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
  // FIND by board name and character id
  const values = await prisma.imageBoard.findUnique({
    where: {
      name: imageId
    },
    select: {
      character: {
        where: {
          nameId: parseInt(characterNameId),
        },
        select: {
          coordinates: true
        } 
      }
    }
  })
  const storedXCoordinate = values.character[0].coordinates[0].coordinates[0]
  const storedYCoordinate = values.character[0].coordinates[0].coordinates[1]
  return { storedXCoordinate, storedYCoordinate }
}

function getCoordinateMatchStatus(coordinateX, coordinateY, clickX, clickY) {
  // if the difference between clickX and storedX is greater than 10? it's not in range
  const lowEndX = coordinateX - 5
  const highEndX = coordinateX + 6
        
  const lowEndY = coordinateY - 5
  const highEndY = coordinateY + 6  // 25
    
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
  console.log("checkedCoordinate =", coordinateMatchStatus)
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
  console.log("player.foundCoordinates", player.foundCoordinates)
  return player.foundCoordinates
}

export { getCoordinateMatchStatus, checkPlayerStatus, createPlayerConnectSession, getImageCoordinates, incrementFoundCoordinates }