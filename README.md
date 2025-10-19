# fesk-rt
[![Tests](https://github.com/eiriksm/fesk-rt/actions/workflows/test.yml/badge.svg)](https://github.com/eiriksm/fesk-rt/actions/workflows/test.yml)
FESK decoding, real time ⚡

## Cypress audio fixtures per run
To run the Cypress suite with different fake microphone WAV files, launch Cypress separately for each spec so Chromium reloads the desired fixture on startup. For example:

```bash
npx cypress run --spec cypress/e2e/mic.cy.js --env fakeAudioCapture=public/sample.wav
npx cypress run --spec cypress/e2e/mic_alt.cy.js --env fakeAudioCapture=public/sample_alt.wav
```

For longer lists, a small shell loop keeps things tidy:

```bash
for wav in sample.wav sample_alt.wav; do
  CYPRESS_fakeAudioCapture=public/$wav npx cypress run --spec "cypress/e2e/mic_${wav%.wav}.cy.js"
done
```

Each invocation boots a fresh Chromium process with the matching `--use-file-for-fake-audio-capture` flag, so the requested test hears the correct audio fixture.
