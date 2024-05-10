class Foo2 {
  handler(@CheckParam() input: string) {
    console.log(input)
  }
}

function CheckParam(): ParameterDecorator {
  return (target, methodIdentifier, index) => {
    console.log(target, methodIdentifier, index)
  }
}

// {} handler 0
new Foo2().handler('faizgear')
