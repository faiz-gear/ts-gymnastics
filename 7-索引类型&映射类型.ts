/* --------------------------------- 索引签名类型 --------------------------------- */
interface AllStringTypes {
  [key: string]: string
}
/* --------------------------------- 索引签名类型 --------------------------------- */

/* --------------------------------- 索引类型查询 --------------------------------- */
interface Foo {
  aaa: number
  200: boolean
}

// type FooKeys = keyof Foo // keyof Foo
type FooKeys = keyof Foo & {} // 'aaa' | 200 这样可以看到实际的联合类型值

/* --------------------------------- 索引类型查询 --------------------------------- */

/* --------------------------------- 索引类型访问 --------------------------------- */
type PropTypeUnion = Foo[keyof Foo] // number | boolean

interface Bar {
  propA: number
}

// 需要通过字面量类型来访问
type PropAType = Foo[string] // Property 'string' does not exist on type 'Foo'.
/* --------------------------------- 索引类型访问 --------------------------------- */

/* ---------------------------------- 映射类型 ---------------------------------- */
// k in 是索引类型语法
type Stringify<T> = {
  [k in keyof T]: string
}

interface Bax {
  a: number
  b: boolean
}

type BaxStringify = Stringify<Bax> // { a: string, b: string }

type Clone<T> = {
  [k in keyof T]: T[k]
}

type BaxClone = Clone<Bax> // { a: number, b: boolean }
/* ---------------------------------- 映射类型 ---------------------------------- */
