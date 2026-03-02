import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { app } from '../app'
import { prisma } from '../lib/prisma'

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
    await prisma.$disconnect()
})

beforeEach(async () => {
    await prisma.productMaterial.deleteMany()
    await prisma.product.deleteMany()
})

describe('POST /products', () => {
    it('should create a product', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Product A', value: 100 }
        })
        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject({ name: 'Product A', value: 100 })
    })

    it('should not create a product with missing fields', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Product A' }
        })
        expect(response.statusCode).toBe(400)
    })
})

describe('GET /products', () => {
    it('should list all products', async () => {
        await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Product A', value: 100 }
        })

        const response = await app.inject({
            method: 'GET',
            url: '/products'
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toHaveLength(1)
    })
})

describe('GET /products/:id', () => {
    it('should get a product by id', async () => {
        const created = await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Product A', value: 100 }
        })

        const { id } = created.json()

        const response = await app.inject({
            method: 'GET',
            url: `/products/${id}`
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject({ name: 'Product A' })
    })

    it('should return 404 when product not found', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/products/invalid-id'
        })
        expect(response.statusCode).toBe(404)
    })
})

describe('PUT /products/:id', () => {
    it('should update a product', async () => {
        const created = await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Product A', value: 100 }
        })

        const { id } = created.json()

        const response = await app.inject({
            method: 'PUT',
            url: `/products/${id}`,
            payload: { name: 'Product B', value: 200 }
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject({ name: 'Product B', value: 200 })
    })
})

describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
        const created = await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Product A', value: 100 }
        })

        const { id } = created.json()

        const response = await app.inject({
            method: 'DELETE',
            url: `/products/${id}`
        })

        expect(response.statusCode).toBe(204)
    })
})