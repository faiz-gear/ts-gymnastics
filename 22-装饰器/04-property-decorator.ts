class Greeter {
  // 这里修改的是类的原型对象， 实例属性并没有被修改
  @PrototypeFormat('Hello, %s')
  greeting: string
  constructor(message: string) {
    console.log('constructor')
    this.greeting = message
  }

  @GetInstanceFormat('Hello, %s')
  getGreeting() {
    return this.greeting
  }
}

function PrototypeFormat(formatString: string) {
  return function (target: any, propertyKey: string) {
    // 这里的target是类的原型对象
    console.log('format')
    target[propertyKey] = formatString.replace('%s', target[propertyKey])
  }
}

function GetInstanceFormat(formatString: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args)
      return formatString.replace('%s', result)
    }
  }
}

const greeter = new Greeter('world')
console.log(greeter.greeting) // world
console.log(greeter.getGreeting()) // Hello, world
