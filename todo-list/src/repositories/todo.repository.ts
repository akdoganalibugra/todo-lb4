// Import necessary modules
import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoRelations} from '../models';

// Define TodoRepository class and extend from DefaultCrudRepository
export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {
  constructor(
      // Inject DbDataSource to connect to data source
      @inject('datasources.db') dataSource: DbDataSource,
  ) {
    // Call constructor of DefaultCrudRepository to create TodoRepository and manage interaction between Todo model and data source
    super(Todo, dataSource);
  }
}
