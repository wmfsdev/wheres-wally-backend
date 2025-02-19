
import prisma from "../libs/prisma.js";

async function get_times(req, res, next) {
  console.log("get times")

  const response = await prisma.player.findMany({
    select: {
      name: true,
      gameLength: true,
      board: true,
    }
  })

 console.log(response)
  res.status(200).json(response)
}

export { get_times }