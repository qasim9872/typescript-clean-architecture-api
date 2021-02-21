import { ErrorData } from './error-data.type'

export abstract class CustomError extends Error {
  name = ''
  protected data: ErrorData = {}

  constructor() {
    super()
    Error.captureStackTrace(this, this.constructor)
  }

  initialize(data: ErrorData): void {
    this.data = data
  }

  abstract toString(): string
}
