import { ID } from '../core/definitions/entity/id.type'
import { TodoItem, TodoItems } from '../core/entities/todo-item'

export interface TodoItemsRepository {
  listAll(): Promise<TodoItems>
  findById(id: ID): Promise<TodoItem>

  create(todoItem: TodoItem): Promise<TodoItem>
  // update(todoItem: TodoItem): Promise<TodoItem>

  delete(todoItem: TodoItem): Promise<TodoItem>
  deleteById(id: ID): Promise<TodoItem>
}
