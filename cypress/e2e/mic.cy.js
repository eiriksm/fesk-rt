/// <reference types="cypress" />

describe('FESK real time Test', () => {

  it('should decode audio when recording with fake microphone stream', () => {
    cy.visit('/')

    cy.get('#startBtn', { timeout: 10000 }).click()
    cy.wait(6000)
    cy.get('#stopBtn').click()
    cy.get('#out', { timeout: 20000 }).should('not.be.empty')
     .should('contain.text', 'test')
  })
})
