
import prisma from "../libs/prisma.js";

async function get_times(req, res, next) {
  const [ maze, football, rome ] = await prisma.$transaction([
    prisma.player.findMany({
      take: 15,
      where: {
        board: 'maze',
        gameLength: { not: null },
      },
      select: {
        name: true,
        gameLength: true,
        board: true,
      },
      orderBy: {
        gameLength: 'asc'
      }
    }),
    prisma.player.findMany({
      take: 15,
      where: {
        board: 'football',
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
    }),
    prisma.player.findMany({
      take: 15,
      where: {
        board: 'rome',
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
  ])
  res.status(200).json({maze, football, rome}) 
}

export { get_times }