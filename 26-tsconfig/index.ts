function fn(x: string) {
  console.log('Hello, ' + x.toLowerCase())
}

type StringOrNumberFunc = (ns: string | number) => void

// 不能将类型“string | number”分配给类型“string”。(函数逆变，tsconfig.json中strictFunctionTypes: true)
let func: StringOrNumberFunc = fn
