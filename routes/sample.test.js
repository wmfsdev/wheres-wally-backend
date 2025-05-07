import { expect, test, vi } from 'vitest'
//import { createUser } from '../controllers/indexController'

import { checkPlayerStatus, getImageCoordinates, getCoordinateMatchStatus } from '../utils/helper'
import prisma from '../libs/__mocks__/prisma'

vi.mock('../libs/prisma')

// ---- UNIT TESTS (ROUTER) ----

test('checkPlayerStatus should return true if player found', async() => {
  prisma.player.findUnique.mockResolvedValue(!null)
  const status = await checkPlayerStatus(1)
  expect(status).toEqual(true)
})

test('checkPlayerStatus should return false if player not found', async() => {
  prisma.player.findUnique.mockResolvedValue(null)
  const status = await checkPlayerStatus(1)
  expect(status).toEqual(false)
})

test('getImageCoordinates should return x and y coordinates', async() => {
  const values = { 
    character: [{
      coordinates: [{
        coordinates: [15, 25],
      }]
    }]
  }

  prisma.imageBoard.findUnique.mockResolvedValue(values)

  const { storedXCoordinate, storedYCoordinate } = await getImageCoordinates("maze", "wilma_maze")

  expect(storedXCoordinate).toEqual(15)
  expect(storedYCoordinate).toEqual(25)
})

test('getCoordinateMatchStatus returns true if difference between click and stored coordinate is no greater than 10', async() => {

  const storedX = 10
  const storedY = 10
  const clickX = 15
  const clickY = 15

  const status = getCoordinateMatchStatus(storedX, storedY, clickX, clickY)
  expect(status).toBe(true)
})

test('getCoordinateMatchStatus returns true if difference between either click values and either of the respective stored values is greater than 10', async() => {

  const storedX = 0
  const storedY = 10
  const clickX = 5
  const clickY = 15

  const status = getCoordinateMatchStatus(storedX, storedY, clickX, clickY)
  expect(status).toBe(true)
})