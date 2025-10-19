/// <reference types="cypress" />

describe("FESK real time Test", () => {
  it("should decode audio when recording with fake microphone stream", () => {
    const recordDurationMs = Number(Cypress.env("recordDurationMs")) || 16000;
    const decodeTimeoutMs = Number(Cypress.env("decodeTimeoutMs")) || 20000;
    const expectedText = Cypress.env("expectedText") || "test";

    cy.visit("/");

    cy.get("#startBtn", { timeout: 10000 }).click();
    cy.wait(recordDurationMs);
    cy.get("#stopBtn").click();
    cy.get("#out .decoded-ok", { timeout: decodeTimeoutMs })
      .should("not.be.empty")
      .should("contain.text", expectedText);
  });
});
