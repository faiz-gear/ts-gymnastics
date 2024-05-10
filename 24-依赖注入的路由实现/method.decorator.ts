import 'reflect-metadata'

export enum METADATA_KEY {
  METHOD = 'ioc:method',
  PATH = 'ioc:path'
}

export enum REQUEST_METHOD {
  GET = 'get',
  POST = 'post'
}

export const methodDecoratorFactory = (method: REQUEST_METHOD) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
      Reflect.defineMetadata(METADATA_KEY.METHOD, method, descriptor.value!)
      Reflect.defineMetadata(METADATA_KEY.PATH, path, descriptor.value!)
    }
  }
}

export const Get = methodDecoratorFactory(REQUEST_METHOD.GET)
export const Post = methodDecoratorFactory(REQUEST_METHOD.POST)
