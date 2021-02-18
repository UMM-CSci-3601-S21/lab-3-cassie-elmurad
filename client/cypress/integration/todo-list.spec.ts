import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todos list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for user 'Lynn Ferguson'
    cy.get('#todo-owner-input').type('Fry');

    // All of the user cards should have the name we are filtering by
    page.getTodoListItems().each(e => {
      cy.wrap(e).find('.todo-list-owner').should('contain.text', 'Fry');
    });


  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for users of age '27'
    cy.get('#todo-category-input').type('d');

    // Go through each of the cards that are being shown and get the names
    page.getTodoListItems().find('.todo-list-category')
      // We should see these users whose age is 27
      .should('contain.text', 'video games')
      .should('contain.text', 'software design')
      // We shouldn't see these users
      .should('not.contain.text', 'groceries')
      .should('not.contain.text', 'homework');
  });


});

