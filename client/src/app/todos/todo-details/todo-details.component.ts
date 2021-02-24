import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  todo: Todo;
  id: string;

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.todoService.getTodoById(this.id).subscribe(todo => this.todo = todo);
    });
  }

}
