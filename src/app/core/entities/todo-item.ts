import { Entity } from '../definitions/interfaces/entity.interface'
import { ID } from '../definitions/types/id.type'

export class TodoItem implements Entity {
  public id?: ID

  constructor(public name: string, public completed: boolean) {}
}

export type TodoItems = TodoItem[]
