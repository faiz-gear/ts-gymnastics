import 'reflect-metadata'

import { METADATA_KEY } from './method.decorator'

type AsyncFunc = (...args: any[]) => Promise<any>

interface ICollected {
  path: string
  requestMethod: string
  requestHandler: AsyncFunc
}

export const routerFactory = <T extends object>(ins: T): ICollected[] => {
  const prototype = Reflect.getPrototypeOf(ins) as any

  // 获取Controller装饰器的path
  const rootPath = <string>Reflect.getMetadata(METADATA_KEY.PATH, prototype.constructor)
  console.log('🚀 ~ file: util.ts ~ line 18 ~ routerFactory ~ rootPath', rootPath)

  // 获取原型上的方法
  const methods = <string[]>Reflect.ownKeys(prototype).filter((item) => item !== 'constructor')

  const collected = methods.map((m) => {
    const requestHandler = prototype[m]
    // 获取Get/Post装饰器的path和method
    const path = <string>Reflect.getMetadata(METADATA_KEY.PATH, requestHandler)

    const requestMethod = <string>Reflect.getMetadata(METADATA_KEY.METHOD, requestHandler).replace('ioc:', '')

    return {
      path: `${rootPath}${path}`,
      requestMethod,
      requestHandler
    }
  })
  return collected
}
