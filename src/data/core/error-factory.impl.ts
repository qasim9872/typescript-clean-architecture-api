import { CustomError } from '../../app/core/definitions/error/custom-error.abstract'
import { ErrorFactory } from '../../app/core/definitions/error/error-factory.interface'
import { ErrorType } from '../../app/core/definitions/error/error.enum'
import { Error } from '../../app/core/definitions/error/error.type'
import ERRORS from './errors'

export class ErrorFactoryImpl implements ErrorFactory {
  getError(name: ErrorType, data: Error): CustomError {
    const errorImpl = ERRORS[name] || ERRORS[ErrorType.GENERAL]
    const params = data || {}

    errorImpl.initialize(params)
    return errorImpl
  }
}
