/// <reference types="cypress" />

describe('Inventory System E2E', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    describe('Raw Materials', () => {
        it('should navigate to raw materials page', () => {
            cy.contains('Matéria Prima').click()
            cy.contains('Matérias Primas').should('be.visible')
        })

        it('should create a raw material', () => {
            cy.contains('Matéria Prima').click()
            cy.contains('Novas matérias primas').click()
            cy.get('input[placeholder="Name"]').type('Steel')
            cy.get('input[placeholder="Stock Quantity"]').type('100')
            cy.contains('Save').click()
            cy.contains('Steel').should('be.visible')
        })

        it('should edit a raw material', () => {
            cy.contains('Matéria Prima').click()
            cy.contains('Editar').first().click()
            cy.get('input[placeholder="Name"]').clear().type('Steel Updated')
            cy.contains('Save').click()
            cy.contains('Steel Updated').should('be.visible')
        })

        it('should delete a raw material', () => {
            cy.contains('Matéria Prima').click()
            cy.contains('Deletar').first().click()
        })
    })

    describe('Products', () => {
        it('should navigate to products page', () => {
            cy.contains('Produto').click()
            cy.contains('Produto').should('be.visible')
        })

        it('should create a product', () => {
            cy.contains('Produto').click()
            cy.contains('Novo produto').click()
            cy.get('input[placeholder="Name"]').type('Product A')
            cy.get('input[placeholder="Value"]').type('100')
            cy.contains('salvar').click()
            cy.contains('Product A').should('be.visible')
        })

        it('should edit a product', () => {
            cy.contains('Produto').click()
            cy.contains('Editar').first().click()
            cy.get('input[placeholder="Name"]').clear().type('Product Updated')
            cy.contains('salvar').click()
            cy.contains('Product Updated').should('be.visible')
        })

        it('should delete a product', () => {
            cy.contains('Produto').click()
            cy.contains('Deletar').first().click()
        })
    })

    describe('Production Suggestion', () => {
        it('should navigate to production suggestion page', () => {
            cy.contains('Sugestão de produto').click()
            cy.contains('Production Suggestion').should('be.visible')
        })

        it('should generate production suggestion', () => {
            cy.contains('Sugestão de produto').click()
            cy.contains('Gerar Sugestão').click()
        })
    })
})