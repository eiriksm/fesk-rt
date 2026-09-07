import { defineConfig } from 'cypress'
import path from 'node:path'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--use-fake-ui-for-media-stream')
          launchOptions.args.push('--use-fake-device-for-media-stream')

          const audioFixture = config.env.fakeAudioCapture || 'public/sample.wav'
          const resolvedPath = path.resolve(config.projectRoot, audioFixture)
          launchOptions.args.push(`--use-file-for-fake-audio-capture=${resolvedPath}`)
        }

        return launchOptions
      })

      // None of these are sensitive, so expose them to the browser-side spec
      // code instead of leaving them in config.env (which Cypress 16+ no
      // longer surfaces via Cypress.env() in the browser).
      config.expose = {
        ...config.expose,
        recordDurationMs: config.env.recordDurationMs,
        decodeBufferMs: config.env.decodeBufferMs,
        expectedText: config.env.expectedText,
        modulation: config.env.modulation,
      }

      return config
    },
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    video: false,
    screenshot: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1800,
    viewportHeight: 2048,
  }
})
