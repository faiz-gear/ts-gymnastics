import 'reflect-metadata'
import { ClassStruct, Container } from './container'

export function Provide(key?: string): ClassDecorator {
  return (Target) => {
    // 注册Class
    Container.set(key ?? Target.name, Target as unknown as ClassStruct)
    Container.set(Target, Target as unknown as ClassStruct)
  }
}

export function Inject(key?: string): PropertyDecorator {
  return (target, propertyKey) => {
    // Car:driver - DriverService
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key ?? Reflect.getMetadata('design:type', target, propertyKey)
    )
  }
}
