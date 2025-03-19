
import prisma from "../libs/prisma.js";

async function get_times(req, res, next) {
  const response = await prisma.player.findMany({
    take: 10,
    where: {
      gameLength: { not: null }
    },
    select: {
      name: true,
      gameLength: true,
      board: true,
    },
    orderBy: {
      gameLength: 'asc'
    }
  })
  res.status(200).json(response)
}

export { get_times }