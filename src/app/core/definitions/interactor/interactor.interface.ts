import { Input } from './input.interface'
import { Output } from './output.interface'

export interface Interactor {
  execute(request: Input): Promise<Output>
}
