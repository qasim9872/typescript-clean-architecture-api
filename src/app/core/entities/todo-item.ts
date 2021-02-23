import { Entity } from '../definitions/entity/entity.interface'
import { ID } from '../definitions/entity/id.type'

export class TodoItem implements Entity {
  public id?: ID
  public completed: boolean

  constructor(public name: string, completed = false, id?: ID) {
    this.completed = completed
    this.id = id
  }
}

export type TodoItems = TodoItem[]
