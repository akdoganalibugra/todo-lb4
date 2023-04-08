// Import necessary modules
import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoRelations, TodoList} from '../models';
import {TodoListRepository} from './todo-list.repository';

// Define TodoRepository class and extend from DefaultCrudRepository
export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {

  public readonly todoList: BelongsToAccessor<TodoList, typeof Todo.prototype.id>;

  constructor(
      // Inject DbDataSource to connect to data source
      @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(Todo, dataSource);
    // Call constructor of DefaultCrudRepository to create TodoRepository and manage interaction between Todo model and data source
    this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
  }
}
