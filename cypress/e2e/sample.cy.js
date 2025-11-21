/// <reference types="cypress" />

// At the time of recording, this used to decode to "abc 123". Then, after I added it here
// I realized I forgot to include the "0" character, so I shifted the entire protocol by one.
// So yeah, now it reads "abc9012", but I won't re-record it now. It proves the point, yeah?
const THAT_REPEATING_TEST_DECODING = "abc9012";

describe("FESK real time with known samples", () => {
  it("should decode audio from sample 1", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample1Btn").click();
    cy.get("#out .decoded-ok", { timeout: 30000 })
      .should("not.be.empty")
      .should("contain.text", "test");
  });
});
