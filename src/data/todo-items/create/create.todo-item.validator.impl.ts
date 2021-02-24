import Joi from 'joi'

import { ValidatorResult } from '../../../app/core/definitions/validation/validator-result.interface'
import { CreateTodoItemInput } from '../../../app/todo-items/create/create.todo-item.in'
import { CreateTodoItemValidator } from '../../../app/todo-items/create/create.todo-item.validator'

export class CreateTodoItemValidatorImpl implements CreateTodoItemValidator {
  static schema = Joi.object().required()

  validate(request: CreateTodoItemInput): ValidatorResult {
    const joiResult = CreateTodoItemValidatorImpl.schema.validate(request)
    return { valid: joiResult.error === null, error: joiResult.error as any }
  }
}
