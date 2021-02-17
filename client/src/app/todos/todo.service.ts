import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';



@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.apiUrl + 'todo';
  constructor(private httpClient: HttpClient) {

  }

  getTodos(filters?: {body?: string; owner?: string}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters){
      if(filters.body){
        httpParams = httpParams.set('body', filters.body);
      }
      if(filters.owner){
        httpParams = httpParams.set('owner', filters.owner);
      }
    }


    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  filterTodos(todos: Todo[], filters: { status?: boolean; category?:string }): Todo[] {
    let filteredTodos = todos;

    //filter by owner
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    return filteredTodos;
  }


}
