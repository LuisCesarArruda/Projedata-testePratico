import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { productRoutes } from './routes/productRoutes'
import { rawMaterialRoutes } from './routes/rawMaterialRoutes'
import { productMaterialRoutes } from './routes/productMaterialRoutes'
import { suggestionRoutes } from './routes/suggestionRoutes'


export const app = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
})

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})
console.log("DATABASE_URL:", process.env.DATABASE_URL)
app.register(productRoutes, {
    prefix: '/products'
})
app.register(rawMaterialRoutes, {
    prefix: '/raw-materials'
})
app.register(productMaterialRoutes, {
    prefix: '/product-materials'
})
app.register(suggestionRoutes, {
    prefix: '/production-suggestion'
})