import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoService } from './todo.service';
import { Todo } from './todo';

/**
 * A "mock" version of the `Todoservice` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      owner: 'Blanche',
      status: false,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      owner: 'Fry',
      status: false,
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      owner: 'Bob',
      status: true,
      body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
      category: 'homework'
    },
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: {body?: string; owner?: string }): Observable<Todo[]> {
    // Our goal here isn't to test (and thus rewrite) the service, so we'll
    // keep it simple and just return the test Todos regardless of what
    // filters are passed in.
    return of(MockTodoService.testTodos);
  }
}
