import { ErrorFactory } from '../../core/definitions/error/error-factory.interface'
import { ErrorType } from '../../core/definitions/error/error.enum'
import { Interactor } from '../../core/definitions/interactor/interactor.interface'
import { CreateTodoItemInput } from './create.todo-item.in'
import { CreateTodoItemOutput } from './create.todo-item.out'
import { CreateTodoItemValidator } from './create.todo-item.validator'

export class CreateTodoItemInteractor implements Interactor {
  constructor(private createTodoItemValidator: CreateTodoItemValidator, private errorFactory: ErrorFactory) {}

  execute(createTodoItemInput: CreateTodoItemInput): Promise<CreateTodoItemOutput> {
    const validatorResult = this.createTodoItemValidator.validate(createTodoItemInput)
    const failedValidation = !validatorResult.valid

    if (failedValidation) {
      throw this.errorFactory.getError(ErrorType.VALIDATION, validatorResult.error)
    }

    return Promise.resolve({ name: 'hello', completed: false })
  }
}
