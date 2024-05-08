// ** @ts-ignore // 忽略错误
// @ts-expect-error // 也是忽略单行错误
// const name: number = 599

// @ts-expect-error 错误使用此指令，报错
// const age: number = 599

// @ts-nocheck 以下代码均不会抛出错误
const name: string = 599
const age: number = 'linbudu'
