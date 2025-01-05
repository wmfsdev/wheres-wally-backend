import prisma from './helpers/client'
import app from '../app'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

// INTEGRATION TESTS

// sample route 
// describe('[GET] /', () => {
//    it('should work', async() => {
//       const response = await request(app)
//          .get('/')
//          .expect("Content-Type", /json/)
//          .expect({ name: "frodo" })
//       expect(response.status).toEqual(200);
//     })
// })

// describe('[POST] /create', () => {
//    it('should respond with 200 status and created user in database', async() => {
//       const { status } = await request(app)
//          .post('/')
//          .set('Content-Type', 'application/json')
//          .send({ 
//             name: 'testuser', 
//             email: 'testuser@email.com' 
//          })

//       // find the user created by the function being tested (createUser()) by querying TEST db
//       const newUser = await prisma.user.findFirst()

//       expect(status).toBe(200)
//       expect(newUser).not.toBeNull()
//       expect(newUser).toEqual(
//          expect.objectContaining({
//             name: 'testuser', 
//             email: 'testuser@email.com'
//          })
//       )
//       expect(newUser.id).toBeTypeOf('number') 
//    })
// })

describe('[POST] /game', () => {
   it('should respond 200 status and create session in database', async() => {
      const response = await request(app)
         .post('/game/new')
       //  .set('Content-Type', 'application/json')

      const newSession = await prisma.session.findFirst()

      expect(newSession).not.toBeNull()
      expect(response.status).toEqual(200);


   })
})