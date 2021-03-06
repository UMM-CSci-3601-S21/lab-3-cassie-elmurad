import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],

})
export class TodoListComponent implements OnInit {

  public serverFilteredTodos: Todo[] = [];
  public filteredTodos: Todo[];

  // Made public so that tests can reference them
  public todoBody: string;
  public todoCategory: string;
  public todoStatus: string;
  public todoOwner: string;
  public todoLimit: number;
  public sortBy: 'body' | 'status' | 'owner' | 'category' = 'owner';
  public viewType: 'list';


  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {

  }

  getTodosFromServer() {
      this.todoService.getTodos({
      body: this.todoBody,
      owner: this.todoOwner,
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      // If there was an error getting the todos, display
      // a message.
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        // The message will disappear after 3 seconds.
        { duration: 3000 });

    });
  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { status: this.todoStatus, category: this.todoCategory, body: this.todoBody, limit: this.todoLimit });
  }

  public updateSort(sortField: string) {
    this.filteredTodos = this.todoService.sortTodos(
      this.serverFilteredTodos, sortField);
      this.updateFilter();

  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
