/* eslint-disable @typescript-eslint/no-explicit-any */
import { asClass, asValue, AwilixContainer, createContainer, InjectionMode } from 'awilix'

interface Constructor<T> {
  new (...args: any[]): T
}

interface Dependency {
  name: string
  singleton?: boolean
  useClass?: Constructor<any>
  useValue?: any
}

export type MockNested<T> = { [key in keyof T]: jest.Mock }

export class TestEnvironment {
  static create(deps: Dependency[] = []): TestEnvironment {
    const testEnvironment = new TestEnvironment()

    testEnvironment.registerMultipleDependencies(deps)

    return testEnvironment
  }

  static createAndResolveInstance<T>(constructorFn: Constructor<T>, deps: Dependency[] = []): [TestEnvironment, T] {
    const testEnvironment = TestEnvironment.create(deps)
    testEnvironment.registerClass(constructorFn)
    return [testEnvironment, testEnvironment.resolve(constructorFn.name)]
  }

  private container: AwilixContainer

  constructor() {
    this.container = createContainer({ injectionMode: InjectionMode.CLASSIC })
  }

  registerClass<T>(constructorFn: Constructor<T>, isSingleton = false): void {
    const asClassResult = asClass(constructorFn)

    if (isSingleton) {
      asClassResult.singleton()
    }

    this.container.register(constructorFn.name, asClassResult)
  }

  registerValue<T>(name: string, value: T): void {
    this.container.register(name, asValue(value))
  }

  registerDependency(dependency: Dependency): void {
    if (dependency.useClass) {
      this.registerClass(dependency.useClass, dependency.singleton)
    } else if (dependency.useValue) {
      this.registerValue(dependency.name, dependency.useValue)
    }
  }

  registerMultipleDependencies(dependencies: Dependency[]): void {
    dependencies.map(this.registerDependency.bind(this))
  }

  resolve<T>(name: string): T {
    return this.container.resolve<T>(name)
  }

  resolveClass<T>(constructorFn: Constructor<T>): T {
    return this.resolve(constructorFn.name)
  }
}
