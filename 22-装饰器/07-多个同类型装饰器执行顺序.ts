function Foo5(): MethodDecorator {
  console.log('foo in')
  return (target, propertyKey, descriptor) => {
    console.log('foo out')
  }
}

function Bar(): MethodDecorator {
  console.log('bar in')
  return (target, propertyKey, descriptor) => {
    console.log('bar out')
  }
}

const Baz: MethodDecorator = () => {
  console.log('baz apply')
}

class User2 {
  @Foo5()
  @Bar()
  @Baz
  method() {}
}

// foo in
// bar in
// baz apply
// bar out
// foo out
