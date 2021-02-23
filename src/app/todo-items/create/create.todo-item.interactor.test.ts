import faker from 'faker'
import { MockNested, TestEnvironment } from '../../../test-utils/test-environment'
import { ErrorFactory } from '../../core/definitions/error/error-factory.interface'
import { TodoItemsRepository } from '../todo-items.repository'
import { CreateTodoItemInput } from './create.todo-item.in'
import { CreateTodoItemInteractor } from './create.todo-item.interactor'
import { CreateTodoItemValidator } from './create.todo-item.validator'

describe('Create Todo Item Interactor', () => {
  let testEnvironment: TestEnvironment
  let createTodoItemInteractor: CreateTodoItemInteractor
  let createTodoItemInput: CreateTodoItemInput

  let mockCreateTodoItemValidator: MockNested<CreateTodoItemValidator>
  let mockTodoItemsRepository: MockNested<Pick<TodoItemsRepository, 'create'>>
  let mockErrorFactory: MockNested<ErrorFactory>

  beforeEach(() => {
    mockErrorFactory = {
      getError: jest.fn(() => new Error('error')),
    }

    mockCreateTodoItemValidator = {
      validate: jest.fn(() => ({ valid: true, error: null })),
    }

    mockTodoItemsRepository = {
      create: jest.fn((todoItem) => ({ ...todoItem, id: faker.random.uuid() })),
    }

    testEnvironment = TestEnvironment.create()
    testEnvironment.registerClass(CreateTodoItemInteractor)
    testEnvironment.registerValue('createTodoItemValidator', mockCreateTodoItemValidator)
    testEnvironment.registerValue('todoItemsRepository', mockTodoItemsRepository)
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
        mockCreateTodoItemValidator.validate = jest.fn(() => ({ valid: false, error: null }))
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

    describe('when validation succeeds', () => {
      it('should not throw an error when data is correct', async () => {
        await createTodoItemInteractor.execute(createTodoItemInput)
      })

      it('should call create on todoItemRepository when data passes validation', async () => {
        await createTodoItemInteractor.execute(createTodoItemInput)

        expect(mockTodoItemsRepository.create).toBeCalled()
        expect(mockTodoItemsRepository.create).toBeCalledWith(createTodoItemInput)
      })

      describe('should throw an error when create fails', () => {
        beforeEach(() => {
          mockTodoItemsRepository.create = jest.fn(() => Promise.reject(new Error('Failed to create item')))
        })

        it('should call throw an error when todoItemRepository fails to create', async () => {
          expect.assertions(1)
          try {
            await createTodoItemInteractor.execute(createTodoItemInput)
          } catch (error) {
            expect(error).toBeDefined()
          }
        })
      })
    })
  })
})
