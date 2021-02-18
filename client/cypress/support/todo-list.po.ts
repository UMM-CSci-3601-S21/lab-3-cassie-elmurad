export class TodoListPage{

  navigateTo() {
    return cy.visit('/todos');
  }

  getUrl() {
    return cy.url();
  }

  getTodoTitle() {
    return cy.get('.todo-list-title');
  }

  getBodySortSelect(){
    return cy.get('.todo-sort-select');
  }

  changeSort(sortBy: 'status' | 'body' | 'owner' | 'category') {
    return cy.get(`[data-test=sortByRadio] .mat-radio-button[value="${sortBy}"]`).click();
  }





  getTodoListItems() {
    return cy.get('.todo-nav-list .todo-list-item');
  }






}
