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

  it("should decode audio from sample 2", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample2Btn").click();
    cy.get("#out .decoded-ok", { timeout: 30000 })
      .should("not.be.empty")
      .should("contain.text", THAT_REPEATING_TEST_DECODING);
  });

  it("should decode audio from sample 3", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample3Btn").click();
    cy.get("#out .decoded-ok", { timeout: 40000 })
      .should("not.be.empty")
      .should("contain.text", THAT_REPEATING_TEST_DECODING);
  });

  it("should decode audio from sample 4", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample4Btn").click();
    cy.get("#out .decoded-ok", { timeout: 18000 })
      .should("not.be.empty")
      .should("contain.text", THAT_REPEATING_TEST_DECODING);
  });

  it("should decode audio from sample 5", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample5Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", THAT_REPEATING_TEST_DECODING);
  });

  it("Should decode audio from sample 6", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample6Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", THAT_REPEATING_TEST_DECODING);
  });

  it("Should decode audio from sample 7", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample7Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", "hello from fesk");
  });

  it("Should decode audio from sample 8", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample8Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", "uptime 2888 seconds");
  });

  it("Should decode audio from sample 9", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample9Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", "uptime 41 seconds");
  });

  it("Should decode audio from sample 10", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample10Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", "test");
  });

  it("Should decode audio from sample 11 with newline", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample11Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should(
        "contain.text",
        `test
test`,
      );
  });
  it("Should decode audio from sample 12 built from counter-32 branch", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample12Btn").click();
    cy.get("#out .decoded-ok", { timeout: 60000 })
      .should("not.be.empty")
      .should("contain.text", "test");
  });
  it("Should decode audio from sample 13 built from counter-32 branch (long)", () => {
    cy.visit("/?debug=1");

    cy.get(".debug-panel summary", { timeout: 10000 }).click();
    cy.get("#sample13Btn").click();
    cy.get("#out .decoded-ok", { timeout: 120000 })
      .should("not.be.empty")
      // This is a really long one. In fact a base32 encoded 4 pixel image.
      .should(
        "contain.text",
        "rfie4rynbinauaaaaagusscekiaaaaacaaaaaaqcamaaaaap3ds3oaaaaaaxgushiia5tsjmp4aaaaajobefs4yaaafrgaaabmjqcae2tqmaaaaabrieyvcfuk737777777vww2skjjduqzpdaaaaaamjfcecvdytrrriyg4aaaab2qaynvjxuloaaaaaacjivhejlscmcba",
      );
  });
});
