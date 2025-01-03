import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
      include: ['tests/**/*.test.js'],
      threads: false,
      setupFiles: ['./tests/helpers/setup.js']
    },
    // resolve: {
    //   alias: {
    //     auth: '/src/auth',
    //     quotes: '/src/quotes',
    //     lib: '/src/lib'
    //   }
    // }
})