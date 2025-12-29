/// <reference types="cypress" />

describe("FESK real time Test", () => {
  it("should decode audio when recording with fake microphone stream", () => {
    const recordDurationMs = Number(Cypress.env("recordDurationMs")) || 16000;
    const decodeTimeoutMs = Number(Cypress.env("decodeTimeoutMs")) || 20000;
    const expectedText = Cypress.env("expectedText") || "test";
    const modulation = Cypress.env("modulation") || "";

    const url = modulation ? `/?modulation=${modulation}` : "/";
    cy.visit(url);

    cy.get("#startBtn", { timeout: 10000 }).click();
    cy.wait(recordDurationMs);
    // At this point should auto-stop, since we passed the CRC.
    cy.get("#out .decoded-ok", { timeout: decodeTimeoutMs })
      .should("not.be.empty")
      .should("contain.text", expectedText.trim());
  });
});
