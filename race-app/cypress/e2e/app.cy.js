describe('Race App Advanced E2E', () => {
  it('navigates from Welcome to Home', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.contains('Welcome to Horse Racing!')
    cy.get('.welcome-actions .v-btn').click()
    cy.contains('Welcome to Horse Racing!').should('not.exist')
    cy.contains('Race Program')
  })

  it('displays generated horses in HorseList', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.welcome-actions .v-btn').click()
    cy.get('.horse-row').should('have.length.at.least', 10)
    cy.get('.horse-row')
      .first()
      .invoke('text')
      .then((text) => {
        const conditionMatch = text.match(/\d{1,3}/)
        expect(conditionMatch).to.not.be.null
        const conditionValue = parseInt(conditionMatch[0], 10)
        expect(conditionValue).to.be.within(1, 100)
      })
  })

  it('generates race schedule and displays program', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.welcome-actions .v-btn').click()
    cy.contains('Generate Program').click()
    cy.get('.list-card-header').should('contain.text', 'Race')
    cy.get('.race-track').should('exist')
  })

  it('starts a race and animates horses', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.welcome-actions .v-btn').click()
    cy.contains('Generate Program').click()
    cy.contains(/Start/i, { timeout: 10000 }).should('be.visible').click()
    cy.get('.horse-icon.racing').should('exist')
  })

  it('shows race results after race completes', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.welcome-actions .v-btn').click()
    cy.contains('Generate Program').click()
    cy.contains(/Start/i, { timeout: 10000 }).should('be.visible').click()
    cy.get('.results-list', { timeout: 15000 }).should('exist')
    cy.get('.result-row').should('have.length.at.least', 1)
    cy.get('.name-cell').first().should('not.be.empty')

    //  Start 2nd race
    cy.contains(/Start/i, { timeout: 10000 }).should('be.visible').click()
    cy.get('.race-item', { timeout: 15000 }).should('have.length.at.least', 2)
  })

  it('resets races and verifies state', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.welcome-actions .v-btn').click()
    cy.contains('Generate Program').click()
    cy.contains(/Start/i, { timeout: 10000 }).should('be.visible').click()
    cy.get('.results-list', { timeout: 15000 }).should('exist')
    cy.contains('REGENERATE PROGRAM').click()
    // Wait for the UI to reset: results-list should disappear
    cy.get('.results-list', { timeout: 10000 }).should('not.exist')
    cy.get('.no-results-message', { timeout: 10000 }).should('be.visible')
    cy.get('.race-list .race-item').first().should('contain.class', 'race-current')
  })

  it('scrolls to current race and result after race completes', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.welcome-actions .v-btn').click()
    cy.contains('Generate Program').click()
    cy.contains(/Start/i, { timeout: 10000 }).should('be.visible').click()
    cy.get('.results-list', { timeout: 15000 }).should('exist')

    // Check that the current race is at least partially visible in the program panel
    cy.get('.program-content').then(($container) => {
      cy.get('.race-item.race-current').then(($item) => {
        const containerRect = $container[0].getBoundingClientRect()
        const itemRect = $item[0].getBoundingClientRect()
        // At least partially visible if bottom is below top and top is above bottom
        expect(itemRect.bottom).to.be.greaterThan(containerRect.top)
        expect(itemRect.top).to.be.lessThan(containerRect.bottom)
      })
    })

    // Check that the latest result is scrolled near the top of the results panel
    cy.get('.results-content').then(($container) => {
      cy.get('.result-item')
        .last()
        .then(($item) => {
          const containerTop = $container[0].getBoundingClientRect().top
          const itemTop = $item[0].getBoundingClientRect().top
          expect(Math.abs(itemTop - containerTop)).to.be.lessThan(60)
        })
    })
  })
})
