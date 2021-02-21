import faker from 'faker'
import { TestEnvironment } from '../../../test-utils/test-environment'
import { CreateTodoItemInput } from './create.todo-item.in'
import { CreateTodoItemInteractor } from './create.todo-item.interactor'

describe('Create Todo Item Interactor', () => {
  let testEnvironment: TestEnvironment
  let createTodoItemInteractor: CreateTodoItemInteractor
  let createTodoItemInput: CreateTodoItemInput

  beforeEach(() => {
    const mockErrorFactory = {
      getError: jest.fn(() => new Error('error')),
    }

    const mockCreateTodoItemValidator = {
      validate: jest.fn(() => ({ valid: true, error: null })),
    }

    testEnvironment = TestEnvironment.create()
    testEnvironment.registerClass(CreateTodoItemInteractor)
    testEnvironment.registerValue('createTodoItemValidator', mockCreateTodoItemValidator)
    testEnvironment.registerValue('errorFactory', mockErrorFactory)
    createTodoItemInteractor = testEnvironment.resolveClass(CreateTodoItemInteractor)

    createTodoItemInput = {
      name: faker.name.firstName(),
      completed: false,
    }
  })

  describe('new CreateTodoItemInteractor()', () => {
    it('should create an instance of CreateTodoItemInteractor when called with new keyword', () => {
      expect(createTodoItemInteractor).toBeInstanceOf(CreateTodoItemInteractor)
    })
  })

  describe('execute()', () => {
    describe('when validation fails', () => {
      beforeEach(() => {
        const createTodoItemValidator = {
          validate: jest.fn(() => ({ valid: false, error: null })),
        }

        testEnvironment.registerValue('createTodoItemValidator', createTodoItemValidator)
        createTodoItemInteractor = testEnvironment.resolveClass(CreateTodoItemInteractor)
      })

      it('should throw validation error when data is missing or incorrect', async () => {
        const invalidInput = {} as CreateTodoItemInput
        expect.assertions(1)

        try {
          await createTodoItemInteractor.execute(invalidInput)
        } catch (error) {
          expect(error).toBeDefined()
        }
      })
    })

    it('should not throw an error when data is correct', async () => {
      await createTodoItemInteractor.execute(createTodoItemInput)
    })
  })
})
