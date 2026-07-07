/// <reference types="cypress" />

describe("FESK real time Test", () => {
  it("should decode audio when recording with fake microphone stream", () => {
    const recordDurationMs = Number(Cypress.env("recordDurationMs")) || 16000;
    // Buffer added on top of the recording window to absorb CI jitter (shared
    // runners, real-time audio scheduling lag) before the decode/CRC check
    // and DOM update finish. Longer/denser samples (e.g. mic-sample2, a 37s
    // 4FSK recording) leave the least slack, so this needs to be generous
    // enough for the slowest case, not just the median one.
    const decodeBufferMs = Number(Cypress.env("decodeBufferMs")) || 8000;
    const expectedText = Cypress.env("expectedText") || "test";
    const modulation = Cypress.env("modulation") || "";

    const url = modulation ? `/?modulation=${modulation}` : "/";
    cy.visit(url);

    cy.get("#startBtn", { timeout: 10000 }).click();
    // At this point should auto-stop, since we passed the CRC.
    cy.get(".result-row .out-row-text.decoded-ok", {
      timeout: recordDurationMs + decodeBufferMs,
    }).should(($el) => {
      const text = $el.text().trim();
      const expected = expectedText.trim();
      expect(
        text,
        `Decoded text mismatch. Got: "${text}" (length: ${text.length})`,
      ).to.include(expected);
    });
  });
});
