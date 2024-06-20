describe('Shopping Cart Functionality', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/index.html');
    });
  
    it('Should not proceed to checkout with an empty cart', () => {
      cy.wait(1000); // wait for 1 second
      cy.contains('Checkout').click().wait(1000);
      cy.get('#error-message').should('contain', 'Your cart is empty. Please add products to your cart before proceeding to checkout.').scrollIntoView().wait(1000);
    });
  
    it('Should add 1 of each product to the cart', () => {
      cy.get('.product').each(($el) => {
        cy.wrap($el).find('button').click();
        cy.wait(1000); // wait for 1 second between adding each product
      });
      cy.get('.cart-item').should('have.length', 3);
    });
  
    it('Should display the correct total price', () => {
      let totalPrice = 0;
      cy.get('.product').each(($el) => {
        const price = parseInt($el.attr('data-price'), 10);
        totalPrice += price;
        cy.wrap($el).find('button').click();
        cy.wait(1000); // wait for 1 second between adding each product
        cy.get('#cart-total').should('contain', `Total: $${totalPrice}`);
      });
    });
  
    it('Should proceed to checkout with products in the cart', () => {
      cy.get('.product').each(($el) => {
        cy.wrap($el).find('button').click();
        cy.wait(1000); // wait for 1 second between adding each product
      });
      cy.contains('Checkout').click();
      cy.url().should('include', 'checkout.html');
    });
  
    it('Should not proceed with an empty cart on the checkout page', () => {
      cy.get('.product').each(($el) => {
        cy.wrap($el).find('button').click();
        cy.wait(1000); // wait for 1 second between adding each product
      });
      cy.contains('Checkout').click().wait(2000);
      cy.get('.cart-item-remove').eq(0).click().wait(1000);
      cy.get('.cart-item-remove').eq(1).click().wait(1000);
      cy.get('.cart-item-remove').eq(0).click().wait(1000);
      cy.get('#error-message').should('contain', 'Your cart is empty. Please add products to your cart before proceeding with the order.');
      cy.contains('Back to the shop').click();
      cy.url().should('include', 'index.html');
    });
  
    it('Should fill in the form and proceed to success page', () => {
      cy.get('.product').each(($el) => {
        cy.wrap($el).find('button').click();
        cy.wait(1000); // wait for 1 second between adding each product
      });
      cy.contains('Checkout').click();
      cy.get('#name').type('Peter');
      cy.wait(1000); // wait for 1 second
      cy.get('#address').type('Elm Street 8');
      cy.wait(1000); // wait for 1 second
      cy.get('#payment-method').select('Cash');
      cy.wait(1000); // wait for 1 second
      cy.get('button[type="submit"]').click();
      cy.url().should('include', 'success.html');
      cy.get('#confirmation-message').should('contain', 'Thank you, Peter! Your order will be delivered to Elm Street 8 within 7 days. Payment Method: Cash.');
    });
  });
  