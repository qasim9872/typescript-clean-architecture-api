import { CustomError } from './custom-error.abstract'
import { Error } from './error.type'

export interface ErrorFactory {
  getError(name: string, data: Error): CustomError
}
