import { TodoItems, TodoItem } from '../../app/core/entities/todo-item'
import { TodoItemsRepository } from '../../app/todo-items/todo-items.repository'

export class TodoItemsRepositoryImpl implements TodoItemsRepository {
  listAll(): Promise<TodoItems> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<TodoItem> {
    throw new Error('Method not implemented.')
  }
  create(todoItem: TodoItem): Promise<TodoItem> {
    return Promise.resolve(todoItem)
  }
  delete(todoItem: TodoItem): Promise<TodoItem> {
    throw new Error('Method not implemented.')
  }
  deleteById(id: string): Promise<TodoItem> {
    throw new Error('Method not implemented.')
  }
}
