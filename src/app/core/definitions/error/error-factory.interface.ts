import { CustomError } from './custom-error.abstract'
import { ErrorType } from './error.enum'
import { Error } from './error.type'

export interface ErrorFactory {
  getError(name: ErrorType, data: Error): CustomError
}
