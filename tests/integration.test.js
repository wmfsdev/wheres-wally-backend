import prisma from './helpers/client'
import app from '../app'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

// INTEGRATION TESTS

// const agent = request.agent(app)

describe('[POST] /game/board', () => {
   it('should respond 200 status and create session in database', async() => {
      const response = await request(app)
         .post('/game/board')
         .set('Content-Type', 'application/json')
         .send()
      
      const newSession = await prisma.session.findFirst()

      expect(response.get("Set-Cookie")).toBeDefined()
      expect(newSession).not.toBeNull()
      expect(response.status).toEqual(200);
   })
})