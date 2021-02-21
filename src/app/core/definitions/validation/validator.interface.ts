import { ValidatorResult } from './validator-result.interface'

export interface Validator<T> {
  validate(value: T): ValidatorResult
}
