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
    // Filter for todo of categories with a 'd' in them
    cy.get('#todo-category-input').type('d');


    page.getTodoListItems().find('.todo-list-category')

      .should('contain.text', 'video games')
      .should('contain.text', 'software design')
       // should not return these categories
      .should('not.contain.text', 'groceries')
      .should('not.contain.text', 'homework');
  });

  it('Should type false in the status filter and check that it returned correct elements', () => {
    // Filter for todo of false status
    cy.get('#todo-status-input').type('false');


    page.getTodoListItems().find('.todo-list-status-false')

      .should('contain.text', 'false')
      // there shoul dnot be any todos with a true status
      .should('not.contain.text', 'true');
  });

  it('Should type true in the status filter and check that it returned correct elements', () => {
    // Filter for todos with true status
    cy.get('#todo-status-input').type('true');


    page.getTodoListItems().find('.todo-list-status-true')

      .should('contain.text', 'true')
      // there should not be todos with a false status
      .should('not.contain.text', 'false');
  });

  it('should type something for filtering into the body input and return correct elements', () => {
    // get the todo body input
    cy.get('#todo-body-input').type('tempor')

    page.getTodoListItems().find('.todo-list-body')

    .should('contain.text', 'tempor');

  });

  it('should sort todos based on a body', () => {
    page.changeSort('body');
    page.getTodoListItems().find('.todo-list-body')


  });

  it('should sort todos based on a owner value', () => {
    page.changeSort('owner');

  });

  it('should sort todos based on a status value', () => {
    page.changeSort('status');

  });

  it('should type something for filtering into the body input and return correct elements', () => {
    // get the todo body input
    cy.get('#todo-limit-input').type('2')

    page.getTodoListItems().should('have.length', 2);

  });

  it('should route to the todo details view', () => {
    // get the todo body input
    cy.get('#todo-limit-input').type('2')

    page.getTodoListItems().should('have.length', 2);

  });

  it('Should click view profile on a user and go to the right URL', () => {
    page.getTodoListItems().first().then((card) => {
      const firstUserName = card.find('.todo-list-owner').text();
      const firstUserCompany = card.find('.todo-list-category').text();

      // When the view profile button on the first user card is clicked, the URL should have a valid mongo ID
      page.clickViewDetail(page.getTodoListItems().first());

      // The URL should contain '/users/' (note the ending slash) and '/users/' should be followed by a mongo ID
      cy.url()
        .should('contain', '/todos/')
        .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

      // On this profile page we were sent to, the name and company should be correct
      cy.get('.todo-card-owner').first().should('have.text', firstUserName);
      cy.get('.todo-card-category').first().should('have.text', firstUserCompany);
    });
   });

});



