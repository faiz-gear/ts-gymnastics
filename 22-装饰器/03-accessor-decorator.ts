class Foo3 {
  _value!: string

  get value() {
    return this._value
  }

  // 访问器装饰器， 本质上还是一个方法装饰器
  @HijackSetter('lyle')
  set value(input: string) {
    this._value = input
  }
}

function HijackSetter(val: string): MethodDecorator {
  return (target, methodIdentifier, descriptor: any) => {
    const originalSetter = descriptor.set
    descriptor.set = function (newValue: string) {
      const composed = `Raw: ${newValue}, Actual: ${val}-${newValue}`
      originalSetter.call(this, composed)
      console.log(`HijackSetter: ${composed}`)
    }
    // 篡改 getter，使得这个值无视 setter 的更新，返回一个固定的值
    // descriptor.get = function () {
    //   return val;
    // };
  }
}

const foo3 = new Foo3()
foo3.value = 'faiz-gear' // HijackSetter: Raw: faiz-gear, Actual: lyle-faiz-gear
