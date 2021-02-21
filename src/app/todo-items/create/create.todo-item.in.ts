import { Input } from '../../core/definitions/interactor/input.interface'
import { ID } from '../../core/definitions/entity/id.type'

export interface CreateTodoItemInput extends Input {
  id?: ID
  name: string
  completed?: boolean
}
