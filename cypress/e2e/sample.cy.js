/// <reference types="cypress" />

describe("FESK real time with known samples", () => {
  it("should decode audio from sample 1", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample1Btn").click();
    cy.get("#out .decoded-ok", { timeout: 30000 })
      .should("not.be.empty")
      .should("contain.text", "test");
  });

  it("should decode audio from sample 2", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample2Btn").click();
    cy.get("#out .decoded-ok", { timeout: 30000 })
      .should("not.be.empty")
      .should("contain.text", "abc 123");
  });

  it("should decode audio from sample 3", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample3Btn").click();
    cy.get("#out .decoded-ok", { timeout: 40000 })
      .should("not.be.empty")
      .should("contain.text", "abc 123");
  });

  it("should decode audio from sample 4", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample4Btn").click();
    cy.get("#out .decoded-ok", { timeout: 18000 })
      .should("not.be.empty")
      .should("contain.text", "abc 123");
  });

  it("should decode audio from sample 5", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample5Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", "abc 123");
  });

  it('Should decode audio from sample 6', () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample6Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", "abc 123");
  });
});
