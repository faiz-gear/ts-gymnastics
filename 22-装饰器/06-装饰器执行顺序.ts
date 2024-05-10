function Deco(identifier: string): any {
  console.log(`${identifier} 执行`)
  return function () {
    console.log(`${identifier} 应用`)
  }
}

@Deco('类装饰器')
class Foo4 {
  constructor(@Deco('构造函数参数装饰器') name: string) {}

  @Deco('实例属性装饰器')
  prop?: number

  @Deco('实例方法装饰器')
  handler(@Deco('实例方法参数装饰器') args: any) {}
}

// 实例属性装饰器 执行
// 实例属性装饰器 应用
// 实例方法装饰器 执行
// 实例方法参数装饰器 执行
// 实例方法参数装饰器 应用
// 实例方法装饰器 应用
// 类装饰器 执行
// 构造函数参数装饰器 执行
// 构造函数参数装饰器 应用
// 类装饰器 应用

/**
 * 1.Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
2.Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
3.Parameter Decorators are applied for the constructor.
Class Decorators are applied for the class.
 */
