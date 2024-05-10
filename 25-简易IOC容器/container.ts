export type ClassStruct<T = any> = new (...args: any[]) => T

type ServiceKey<T = any> = string | ClassStruct<T> | Function

export class Container {
  private static services: Map<ServiceKey, ClassStruct> = new Map() // 保存所有的服务Class
  // Car:driver - DriverService
  public static propertyRegistry: Map<string, string> = new Map() // 保存需要注入服务的属性

  public static set(key: ServiceKey, value: ClassStruct): void {
    Container.services.set(key, value)
  }

  public static get<T = any>(serviceKey: ServiceKey): T | undefined {
    // 检测服务是否存在
    const classStruct = Container.services.get(serviceKey)
    if (!classStruct) {
      return undefined
    }

    // 实例化服务
    const instance = new classStruct()

    // 注入属性
    const properties = Container.propertyRegistry.entries()
    for (const [injectKey, serviceKey] of properties) {
      const [classKey, propKey] = injectKey.split(':')

      if (classKey !== classStruct.name) continue // 不是当前类的属性，跳过

      // 获取需要注入的服务
      const service = Container.get(serviceKey)

      if (service) {
        // 注入属性
        instance[propKey] = service
      }
    }

    return instance
  }

  private constructor() {}
}
