import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  server: {
    preset: 'vercel',
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      (() => {
        const replacements = [
          // replace `throw Error(p(418))` with `console.error(p(418))`
          ['throw Error(p(418))', 'console.error(p(418))'],
          // replace `throw new Error('Hydration failed` with `console.error('Hydration failed')`
          [
            `throw new Error('Hydration failed`,
            `console.error('Hydration failed`,
          ],
        ] as const

        return {
          name: 'tanner-test',
          enforce: 'post',
          transform(code, id) {
            replacements.forEach(([search, replacement]) => {
              if (code.includes(search)) {
                console.log('found a match', id, search)
                code = code.replaceAll(search, replacement)
              }
            })

            return code
          },
        }
      })(),
    ],
  },
  routers: {
    client: {
      vite: {
        plugins: [
          sentryVitePlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: 'tanstack',
            project: 'tanstack-com',
          }),
        ],
      },
    },
  },
})
