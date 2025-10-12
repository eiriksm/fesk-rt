/// <reference types="cypress" />

describe("FESK real time with known samples", () => {
  it("should decode audio from sample 1", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample1Btn").click();
    cy.wait(4000);
    cy.get("#out .decoded-ok", { timeout: 20000 })
      .should("not.be.empty")
      .should("contain.text", "test");
  });

  it("should decode audio from sample 2", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample2Btn").click();
    cy.wait(20000);
    cy.get("#out .decoded-ok", { timeout: 20000 })
      .should("not.be.empty")
      .should("contain.text", "abc 123");
  });

  it("should decode audio from sample 3", () => {
    cy.visit("/");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample3Btn").click();
    cy.wait(10000);
    cy.get("#out .decoded-ok", { timeout: 20000 })
      .should("not.be.empty")
      .should("contain.text", "abc 123");
  });

});
