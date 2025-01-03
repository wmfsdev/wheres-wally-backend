import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
      include: ['routes/**/*.test.js']
    },
    // resolve: {
    //   alias: {
    //     auth: '/src/auth',
    //     quotes: '/src/quotes',
    //     lib: '/src/lib'
    //   }
    // }
})