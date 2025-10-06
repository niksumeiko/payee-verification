import { App } from '../App';

describe('Payee verification', () => {
    it('see matched payee name', () => {
        cy.intercept('GET', '**payee-verification/xy', {
            body: { state: 'MATCH' },
        });

        cy.mount(<App />, '/');

        cy.getByTestId('payee-name').type('y');
        cy.getByTestId('account-number').type('x').blur();

        cy.getByTestId('payee-verification-icon').should('contain.text', 'Verified');
        cy.getByTestId('payee-verification-info').should(
            'have.text',
            'This payee is verified',
        );
    });

    it('update closely matched payee name', () => {
        cy.intercept('GET', '**payee-verification/xz ', {
            body: { state: 'MATCH' },
        });
        cy.intercept('GET', '**payee-verification/xy', {
            body: { state: 'CLOSE_MATCH', name: 'z' },
        });

        cy.mount(<App />, '/');

        cy.getByTestId('payee-name').type('y');
        cy.getByTestId('account-number').type('x').blur();

        cy.getByTestId('payee-verification-icon').should('contain.text', 'Close match');
        cy.getByTestId('payee-verification-info').should(
            'contain.text',
            'There is a potential typo in payee name',
        );

        cy.getByTestId('match-payee-name-control').click();

        cy.getByTestId('payee-name').should('have.value', 'z');
    });

    it('see partially matched payee name', () => {
        cy.intercept('GET', '**payee-verification/xy', {
            body: { state: 'PARTIAL_MATCH' },
        });

        cy.mount(<App />, '/');

        cy.getByTestId('payee-name').type('y');
        cy.getByTestId('account-number').type('x').blur();

        cy.getByTestId('payee-verification-icon').should('contain.text', 'Partial match');
        cy.getByTestId('payee-verification-info').should(
            'have.text',
            'The account number does not match the payee name',
        );
    });

    it('see not matched payee name', () => {
        cy.intercept('GET', '**payee-verification/xy', {
            body: { state: 'NO_MATCH' },
        });

        cy.mount(<App />, '/');

        cy.getByTestId('payee-name').type('y');
        cy.getByTestId('account-number').type('x').blur();

        cy.getByTestId('payee-verification-icon').should('not.exist');
        cy.getByTestId('payee-verification-info').should(
            'have.text',
            'No matching payee found',
        );
    });

    it('see payee name fter failed verification', () => {
        cy.intercept('GET', '**payee-verification/xy', {
            statusCode: 404,
        });

        cy.mount(<App />, '/');

        cy.getByTestId('payee-name').type('y');
        cy.getByTestId('account-number').type('x').blur();

        cy.getByTestId('payee-verification-icon').should('not.exist');
        cy.getByTestId('payee-verification-info').should(
            'have.text',
            'No matching payee found',
        );
    });
});
