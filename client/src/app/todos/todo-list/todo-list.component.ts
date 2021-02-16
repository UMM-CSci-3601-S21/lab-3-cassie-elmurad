import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // Made public so that tests can reference them
  public todoBody: string;
  public todoCategory: string;
  public todoStatus: boolean;
  public todoOwner: string;
  viewType: 'list';
  // public todoId: string;



  constructor() { }

  ngOnInit(): void {
  }

}
