import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('DbAddAccount Usecase', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false when compare fails', async () => {
    const sut = makeSut()
    type compareReturningBoolean = (data: string | Buffer, encrypted: string) => Promise<boolean>
    (bcrypt.compare as compareReturningBoolean) = jest.fn(async () => {
      return await Promise.resolve(false)
    })
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })

  // test('Should throw if bcrypt throws', async () => {
  //   const sut = makeSut()
  //   type hashReturningString = (data: string | Buffer, saltOrRounds: string | number) => Promise<string>
  //   (bcrypt.hash as hashReturningString) = jest.fn(async () => {
  //     return await Promise.reject(new Error())
  //   })
  //   const promise = await sut.hash('any_value')
  //   expect(promise).toThrow()
  // })
})
