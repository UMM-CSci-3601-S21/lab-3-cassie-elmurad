import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  const testTodos: Todo[] = [
    {
      "owner": "Blanche",
      "status": false,
      "body": "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
      "category": "software design"
    },
    {
      "owner": "Fry",
      "status": false,
      "body": "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.",
      "category": "video games"
    },
    {
      "owner": "Bob",
      "status": true,
      "body": "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.",
      "category": "homework"
    },
    {
      "owner": "Blanche",
      "status": true,
      "body": "Incididunt enim ea sit qui esse magna eu. Nisi sunt exercitation est Lorem consectetur incididunt cupidatat laboris commodo veniam do ut sint.",
      "category": "software design"
    }
  ];
  let todoService: TodoService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('getTodos()', () =>{
    it( 'cassls api/todos when getTodos() is called with no parameters', () =>{
      todoService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL.
      const req = httpTestingController.expectOne(todoService.todoUrl);
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request had no query parameters.
      expect(req.request.params.keys().length).toBe(0);
      // Specify the content of the response to that request. This
      // triggers the subscribe above, which leads to that check
      // actually being performed.
      req.flush(testTodos);
    })
  })

  describe('Calling getTodos() with parameters correct forms the HTTP request', () => {

    it('correctly calls api/todos with filter parameter \'Fry\'', () => {
      todoService.getTodos({ owner: 'Fry' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL with the role parameter.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
      );

      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');

      // Check that the role parameter was 'admin'
      expect(req.request.params.get('owner')).toEqual('Fry');

      req.flush(testTodos);
    });

  });

  describe('filterUsers()', () => {


    it('filters by category', () => {
      const todoCategory = 'video games';
      const filteredUsers = todoService.filterTodos(testTodos, { category: todoCategory });
      // There should be 1 todo with an 'i' in their
      // category: video games.
      expect(filteredUsers.length).toBe(1);
      // Every returned user's name should contain an 'i'.
      filteredUsers.forEach(user => {
        expect(user.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });


  })






});
