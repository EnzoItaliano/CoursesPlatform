import { expect, test } from 'vitest'
import supertest from 'supertest'
import { server } from '../app'
import { makeCourse } from '../tests/factories/make-course.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'

test('Get a course by id', async () => {
    await server.ready()

    const { token } = await makeAuthenticatedUser('student')

    const course = await makeCourse()

    const response = await supertest(server.server)
        .get(`/courses/${course.id}`)
        .set('Authorization', token)
    
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: null,
        }
    })
})

test('Return 404 for non existing courses', async () => {
    await server.ready()

    const { token } = await makeAuthenticatedUser('student')

    const response = await supertest(server.server)
        .get(`/courses/ee0b35e2-d959-49c1-adad-2ee8f9a6fd7b`)
        .set('Authorization', token)
    
    expect(response.status).toEqual(404)
})