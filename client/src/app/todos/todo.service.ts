import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';



@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) {

  }

  getTodos(filters?: { body?: string; owner?: string; order?: string }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);

      }

    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  filterTodos(todos: Todo[], filters: { status?: string; category?: string; body?: string }): Todo[] {

    let filteredTodos = todos;

    //filter by category
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);

    }
    if (filters.status){
      filters.status = filters.status.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.status.toString().toLowerCase().indexOf(filters.status) !== -1);
    }
    if(filters.body){
      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !==-1);
    }
    return filteredTodos;
  }

  sortTodos(todos: Todo[], sortField: string){
    let filteredTodos = todos;

    filteredTodos = filteredTodos.sort((a, b) => {
      const nameA = a[sortField].toString().toUpperCase();
      const nameB = b[sortField].toString().toUpperCase();
      return(nameA.localeCompare(nameB));
    });
    return filteredTodos;
  }

}
