import { InvalidParamError, MissingParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldValidation implements Validation {
  private readonly fieldname: string
  private readonly fielToCompareName: string
  constructor (fieldname: string, fielToCompareName: string) {
    this.fieldname = fieldname
    this.fielToCompareName = fielToCompareName
  }
  validate (input: any): Error {
    if (input[this.fieldname] !== input[this.fielToCompareName]) {
      return new InvalidParamError(this.fielToCompareName)
    }
  }
}