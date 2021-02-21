import { Output } from '../../core/definitions/interactor/output.interface'
import { ID } from '../../core/definitions/entity/id.type'

export interface CreateTodoItemOutput extends Output {
  id?: ID
  name: string
  completed: boolean
}
