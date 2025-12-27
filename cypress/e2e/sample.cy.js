/// <reference types="cypress" />

describe("FESK real time with known samples", () => {
  it("should decode audio from sample 1", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample1Btn").click();
    cy.get("#out .decoded-ok", { timeout: 30000 })
      .should("not.be.empty")
      .should("contain.text", "test");
  });

  it("should decode audio from sample 2", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample2Btn").click();
    cy.get("#out .decoded-ok", { timeout: 40000 })
      .should("not.be.empty")
      .should(
        "contain.text",
        "kjeumrr2aaaaav2fijifmubyeaxaaaaa2aaqbhibfiaqaaiaajadqjnaaj2luapyaab3aah65ohf77ec4wc5ovs77vhd6jy7soh6wkaaaa",
      );

    // This thing is also a webp image, check that too.
    cy.get(".decoded-image-row .image-format")
      .should("be.visible")
      .and("have.text", "WebP");
  });

  it("should decode audio from sample 3", () => {
    cy.visit("/?debug=1");
    cy.get(".debug-panel summary", { timeout: 2000 }).click();
    cy.get("#sample3Btn").click();
    cy.get("#out .decoded-ok", { timeout: 8000 })
      .should("not.be.empty")
      .should("contain.text", "uptime 408 seconds");
  });

  it("should decode audio from sample 4", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 2000 }).click();
    cy.get("#sample4Btn").click();
    cy.get("#out .decoded-ok", { timeout: 35000 })
      .should("not.be.empty")
      .should(
        "contain.text",
        "kjeumrr2aaaaav2fijifmubyeaxaaaaa2aaqbhibfiaqaaiaajadqjnaaj2luapyaab3aah65ohf77ec4wc5ovs77vhd6jy7soh6wkaaaa",
      );

    // This thing is also a webp image, check that too.
    cy.get(".decoded-image-row .image-format")
      .should("be.visible")
      .and("have.text", "WebP");
  });

  it("should decode audio from sample 5 (BFSK)", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 2000 }).click();
    cy.get("#sample5Btn").click();
    cy.get("#out .decoded-ok", { timeout: 30000 })
      .should("not.be.empty")
      .should("contain.text", "test");
  });
});
