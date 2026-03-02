import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        include: ['src/tests/**/*.integration.test.ts'],
        hookTimeout: 30000,
    }
})