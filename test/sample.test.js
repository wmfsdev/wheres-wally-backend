import { expect, test, vi } from 'vitest'
import { createUser } from '../controllers/indexController'
import prisma from '../libs/__mocks__/prisma'

vi.mock('../libs/prisma')

test('createUser should return the generated user', async () => {
  const newUser = { email: 'user@prisma.io', name: 'Prisma Fan' }
  prisma.user.create.mockResolvedValue({ ...newUser, id: 1 })
  const user = await createUser(newUser)
  expect(user).toStrictEqual({ ...newUser, id: 1 })
})

// sample test
test('1 === 1', () => {
  expect(1).toBe(1)
})