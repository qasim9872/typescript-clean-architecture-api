import { ErrorType } from '../../../app/core/definitions/error/error.enum'
import { GeneralError } from './general-error'
import { ValidationError } from './validation-error'

export default {
  [ErrorType.GENERAL]: new GeneralError(),
  [ErrorType.VALIDATION]: new ValidationError(),
}
