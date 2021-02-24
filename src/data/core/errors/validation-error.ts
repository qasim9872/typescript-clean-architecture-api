import { CustomError } from '../../../app/core/definitions/error/custom-error.abstract'

export class ValidationError extends CustomError {
  name = 'validationError'

  toString(): string {
    return `${this.name}:
    ${JSON.stringify(this.data, null, 2)}`
  }
}
