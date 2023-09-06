import { InvalidParamError, MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class CompareFieldValidation implements Validation {
  constructor (
    private readonly fieldname: string, 
    private readonly fielToCompareName: string
  ) {}
  validate (input: any): Error {
    if (input[this.fieldname] !== input[this.fielToCompareName]) {
      return new InvalidParamError(this.fielToCompareName)
    }
  }
}