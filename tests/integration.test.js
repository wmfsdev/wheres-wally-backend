import prisma from './helpers/client'
import app from '../app'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

// INTEGRATION TESTS

describe('[POST] /game/board', () => {
  afterEach(async () => {
  console.log("after")
    await prisma.$transaction([
        prisma.session.deleteMany(),
    ])
  })

  it('should create session in database and set cookie in header', async() => {
    const session = await prisma.session.findFirst()
    const response = await request(app)
      .post('/game/board')
      .set('Content-Type', 'application/json')
      .send()
    const newSession = await prisma.session.findFirst()

    expect(session).toBeNull()
    expect(response.get("Set-Cookie")).toBeDefined()
    expect(newSession).not.toBeNull()
  })
})

// describe( // two successive visits only one cookie? )

describe ('[POST] /game/board/:id', () => {
  beforeEach(async () => {
      console.log("before")
      const cookie = `{"cookie":{"originalMaxAge":604800000,"expires":"2025-02-05T21:35:35.853Z","httpOnly":true,"path":"/"}}`

      const session = await prisma.session.create({
         data: {
            id: 'testsid',
            sid: 'testsid',
            data: cookie,
            expiresAt: '2025-02-05T21:35:35.853Z'
         }
      })
      const player = await prisma.player.create({
         data: {
           session: {
             connect: { id: 'testsid' }
           }
         }
      })
      const image = await prisma.imageBoard.create({
         data: {
            name: '1',
            character: {   
               create: {
                  characterName: 'nameA',
                  coordinates: {
                     create: {
                        coordinates: [15, 25]
                     }
                  }
               }
            }   
         }   
      })  
      
  })
  afterEach(async () => {
      console.log("after")
      await prisma.$transaction([
         prisma.session.deleteMany(),
         prisma.player.deleteMany(),
         prisma.coordinate.deleteMany(),
         prisma.character.deleteMany(),
         prisma.imageBoard.deleteMany()
      ])
  })

  it('should successfully match coordinate and return "found element"', async() => {
    const response = await request(app)
      .post('/game/board/1')
      .set('Accept', 'application/json')
      .set('Cookie', ['connect.sid=s:testsid.test'])
      .send({
        character: 'nameA',
        coordinates: { x: 15, y: 25 }
      })
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('found element')
  })

  it('should return JSON with "win!" status after successfully matching 3 coordinates', async() => {
    const response = request(app)
    await response.post('/game/board/1').set('Accept', 'application/json').set('Cookie', ['connect.sid=s:testsid.test']).send({character: 'nameA', coordinates: { x: 15, y: 25 }})
    await response.post('/game/board/1').set('Accept', 'application/json').set('Cookie', ['connect.sid=s:testsid.test']).send({character: 'nameA', coordinates: { x: 15, y: 25 }})

    const final = await response
      .post('/game/board/1')
      .set('Accept', 'application/json')
      .set('Cookie', ['connect.sid=s:testsid.test'])
      .send({
        character: 'nameA',
        coordinates: { x: 15, y: 25 }
      })

    expect(final.body.status).toEqual('win!')
  })

  it('should return JSON with "no element found" after coordinates unsuccessfully match', async() => {
    const response = await request(app)
      .post('/game/board/1')
      .set('Accept', 'application/json')
      .set('Cookie', ['connect.sid=s:testsid.test'])
      .send({
        character: 'nameA',
        coordinates: { x: 11, y: 1 }
      })

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('no element found')
  })

})