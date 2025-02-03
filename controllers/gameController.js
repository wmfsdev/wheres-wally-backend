
import { getCoordinateMatchStatus, checkPlayerStatus, createPlayerConnectSession, getImageCoordinates, incrementFoundCoordinates, extractSid } from "../utils/helper.js";
import prisma from "../libs/prisma.js";


async function post_check_coordinates(req, res, next) {
  console.log("check coordinates")
  const imageId = req.params.id
  const characterNameId = req.body.character
  console.log("coordinates", req.body.coordinates )

  const { x, y } = req.body.coordinates

  // console.log("cookies: ", req.cookies)
  const sid = extractSid(req.cookies['connect.sid'])
  
  // console.log("SID", sid)
  // 0. check to see if there is a player with session ID
  const playerExists = await checkPlayerStatus(sid)
  // console.log("playerExists", playerExists)

  if (!playerExists) {
    console.log("!playerExists")
   // const sessionId = sid
    // no player found - create and connect to session
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
    if (foundCoordinateCount === 5) {
      return res.status(200).json({ status: "win!" })
    }
    return res.status(200).json({ status: "found element" })
    
    
  } else {
    console.log("didn't match:(")
    
    return res.status(200).json({ status: "no element found" })
  }
  
}

async function getImage(req, res, next) {
  const { storedXCoordinate, storedYCoordinate } = await getImageCoordinates()
  console.log("getImage destructure", storedXCoordinate, storedYCoordinate)
  res.status(200).json()
}

export { post_check_coordinates, getImage }
// connectPlayerSessionRelation, createCoordinates, test