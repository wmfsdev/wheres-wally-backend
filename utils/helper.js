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

// relies on session id so should be fine
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
      name: 'test board' // :id param - imageId
    },
    select: {
      character: {
        where: {
          nameId: 1, // nameId/characterNameId
        },
        select: {
          coordinates: true
        } 
      }
    }
  })
  console.log(values.character[0].coordinates[0].coordinates[0])
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
    console.log(i)
    if (i === clickX) {
      console.log("clicked: ", clickX)
      for ( let c = lowEndY ; c !== highEndY ; c++ ) {
        console.log(c)
        if (c === clickY) {
          coordinateMatchStatus = true
          console.log("clicked: ", clickY)
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




// functions for random tasks

// async function createCoordinates(req, res, next) {
//   console.log("create coordinates")
//   const image = await prisma.player.create({
//     data: {
//       //   name: 'test image',
//       sessionId: req.session.id, // 'jGc1uc7bFMozx2PJWn3xKPqppEhA58Aj',
//       coordinates: {   
//         create: [{ coordinates: [ 15, 25 ] }]  
//       }   
//     }   
//   })  
//   res.status(200).json()
// }
// async function createPlayer(req, res, next) { 
//   console.log("create player")
//   console.log(req.session.id)
//   const player = await prisma.player.create({
//     data: {
//       session: {
//         connect: { id: req.session.id }
//       }
//     }
//   })
//   res.status(200).json()
//   console.log(req.session)
//   if (req.session.views) {
//       req.session.views++
//       res.setHeader('Content-Type', 'text/html')
//       res.write('<p>views: ' + req.session.views + '</p>')
//       res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//       res.end()
//     } else {
//       req.session.views = 1
//       res.end('welcome to the session demo. refresh!')
//     }
//  res.status(200).json()
// use req.session.whatever to track winning condition
//}
