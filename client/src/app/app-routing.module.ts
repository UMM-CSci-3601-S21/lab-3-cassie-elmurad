import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';
import { TodoListComponent } from './todos/todo-list.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/:id', component: UserProfileComponent},
  {path: 'todos', component: TodoListComponent},
  {path: 'todos/:id', component: TodoDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
