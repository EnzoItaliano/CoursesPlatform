import { expect, test } from 'vitest'
import supertest from 'supertest'
import { server } from '../app'
import { faker } from '@faker-js/faker'
import { makeUser } from '../tests/factories/make-user'
import { email } from 'zod'

test('Login', async () => {
    await server.ready()

    const { user, passwordBeforeHash } = await makeUser()

    const response = await supertest(server.server)
        .post('/sessions')
        .set('Content-Type', 'application/json')
        .send({
            email: user.email,
            password: passwordBeforeHash
        })
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        token: expect.any(String)
    })
})