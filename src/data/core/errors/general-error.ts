import { CustomError } from '../../../app/core/definitions/error/custom-error.abstract'

export class GeneralError extends CustomError {
  name = 'generalError'

  toString(): string {
    return `${this.name}:
    ${JSON.stringify(this.data, null, 2)}`
  }
}
