function AddMethod(): ClassDecorator {
  return function (target: any) {
    target.prototype.say = function () {
      console.log('add instance method')
    }
    target.run = function () {
      console.log('add static method')
    }
  }
}

function AddProperty(value: string): ClassDecorator {
  return function (target: any) {
    target.prototype.newInstanceProperty = value
    target.newStaticProperty = `static ${value}`
  }
}

@AddMethod()
@AddProperty('12')
class Foo {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const fooInstance = new Foo('foo')

;(<any>fooInstance).say()
;(<any>Foo).run()
console.log((<any>fooInstance).newInstanceProperty)
console.log((<any>Foo).newStaticProperty)
