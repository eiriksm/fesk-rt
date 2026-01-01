/// <reference types="cypress" />

describe("FESK real time Test", () => {
  it("should decode audio when recording with fake microphone stream", () => {
    const recordDurationMs = Number(Cypress.env("recordDurationMs")) || 16000;
    const expectedText = Cypress.env("expectedText") || "test";
    const modulation = Cypress.env("modulation") || "";

    const url = modulation ? `/?modulation=${modulation}` : "/";
    cy.visit(url);

    cy.get("#startBtn", { timeout: 10000 }).click();
    // At this point should auto-stop, since we passed the CRC.
    cy.get(".result-row .out-row-text.decoded-ok", {
      timeout: recordDurationMs,
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
