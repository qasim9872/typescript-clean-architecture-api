import { Entity } from '../definitions/entity/entity.interface'
import { ID } from '../definitions/entity/id.type'

export class TodoItem implements Entity {
  public id?: ID
  public completed = false

  constructor(public name: string, completed: boolean) {
    this.completed = completed
  }
}

export type TodoItems = TodoItem[]
