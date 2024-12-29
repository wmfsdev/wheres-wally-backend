import prisma from './helpers/client'
import app from '../app'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

// INTEGRATION TESTS

// sample route 
describe('[GET] /', () => {
   it('should work', async() => {
      const response = await request(app)
         .get('/')
         .expect("Content-Type", /json/)
         .expect({ name: "frodo" })
      expect(response.status).toEqual(200);
        
    })
})

describe('[POST] /create', () => {
   it('creates a new user', async() => {
      const { status, body } = await request(app)
         .post('/')
         .set('Content-Type', 'application/json')
         .send({ 
            name: 'testuser', 
            email: 'testuser@email.com' 
         })

      // find the user created by the function being tested (createUser()) by querying TEST db
      const newUser = await prisma.user.findFirst()

      expect(status).toBe(200)
      expect(newUser).not.toBeNull()
      expect(newUser).toEqual(
         expect.objectContaining({
            name: 'testuser', 
            email: 'testuser@email.com' 
         })
      )
      expect(newUser.id).toBeTypeOf('number') 
   })
})