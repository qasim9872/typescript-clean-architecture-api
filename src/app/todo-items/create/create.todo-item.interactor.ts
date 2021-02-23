import { ErrorFactory } from '../../core/definitions/error/error-factory.interface'
import { ErrorType } from '../../core/definitions/error/error.enum'
import { Interactor } from '../../core/definitions/interactor/interactor.interface'
import { TodoItem } from '../../core/entities/todo-item'
import { TodoItemsRepository } from '../todo-items.repository'
import { CreateTodoItemInput } from './create.todo-item.in'
import { CreateTodoItemOutput } from './create.todo-item.out'
import { CreateTodoItemValidator } from './create.todo-item.validator'

export class CreateTodoItemInteractor implements Interactor {
  constructor(
    private createTodoItemValidator: CreateTodoItemValidator,
    private todoItemsRepository: TodoItemsRepository,
    private errorFactory: ErrorFactory
  ) {}

  async execute(createTodoItemInput: CreateTodoItemInput): Promise<CreateTodoItemOutput> {
    const validatorResult = this.createTodoItemValidator.validate(createTodoItemInput)
    const failedValidation = !validatorResult.valid

    if (failedValidation) {
      throw this.errorFactory.getError(ErrorType.VALIDATION, validatorResult.error)
    }

    const todoItem = new TodoItem(createTodoItemInput.name, createTodoItemInput.completed)
    const createdTodoItem = await this.todoItemsRepository.create(todoItem)

    return createdTodoItem
  }
}
