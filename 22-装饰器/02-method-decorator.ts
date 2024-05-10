function ComputeProfiler(): MethodDecorator {
  // 这里的 target 是类的原型对象
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    console.log('🚀 ~ file: method-decorator.ts ~ line 4 ~ return ~ target', Object.getOwnPropertyDescriptors(target))
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      console.time(propertyKey as string)
      const result = await originalMethod.apply(this, args)
      console.timeEnd(propertyKey as string)
      return result
    }
  }
}

class User {
  @ComputeProfiler()
  async fetchUser() {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { name: 'John Doe' }
  }
}

;(async () => {
  await new User().fetchUser()
})()
