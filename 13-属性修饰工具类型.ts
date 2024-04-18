/* -------------------------------- 1.属性修饰工具类型 -------------------------------- */
type MyPartial<T> = {
  [K in keyof T]+?: T[K] // +可加可不加
}

type MyRequired<T> = {
  [K in keyof T]-?: T[K] // -? 代表如果有可选修饰符,则去掉可选
}

type MyReadonly<T> = {
  +readonly [K in keyof T]: T[K] // +可加可不加
}

// 延伸
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

/* --------------------------------- 递归属性修饰 --------------------------------- */
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]
}

type DeepReadonly<T> = {
  +readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

type Res1 = DeepPartial<{ a: { b: { c: number } } }> // { a?: { b?: { c?: number } } }

/* --------------------------------- 递归属性修饰 --------------------------------- */

/* --------------------------------- 部分属性修饰 --------------------------------- */
type PartPartial<T, K extends keyof T> = {
  [P in K]?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

type PartRequired<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

type PartReadonly<T, K extends keyof T> = {
  +readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

type PartMutable<T, K extends keyof T> = {
  -readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

type PartPartialResult1 = PartPartial<{ a: string; b: number }, 'a'> // { a?: string; b: number }
/* --------------------------------- 部分属性修饰 --------------------------------- */
/* -------------------------------- 1.属性修饰工具类型 -------------------------------- */

/* -------------------------------- 2.结构工具类型 -------------------------------- */
type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

type Dictionary<T> = {
  [index: string]: T
}

type NumericDictionary<T> = {
  [index: number]: T
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// type MyOmit<T, K extends keyof any> = {
//   [P in Exclude<keyof T, K>]: T[P]
// }

type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type OmitResult1 = MyOmit<{ a: string; b: number }, 'a'> // { b: number }
/* -------------------------------- 2.结构工具类型 -------------------------------- */

/* -------------------------------- 3.集合工具类型 -------------------------------- */
type MyExclude<T, U> = T extends U ? never : T // 利用的就是条件类型的分发特性
type MyExtract<T, U> = T extends U ? T : never
type MyNonNullable<T> = T extends null | undefined ? never : T

type ExcludeResult1 = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type ExtractResult1 = MyExtract<'a' | 'b' | 'c', 'a'> // 'a'
/* -------------------------------- 3.集合工具类型 -------------------------------- */

/* -------------------------------- 4.模式匹配工具类型 -------------------------------- */
type FunctionType = (...args: any) => any
type MyParameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never
type MyReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : never
type FirstParameter<T extends FunctionType> = T extends (arg: infer P, ...args: any) => any ? P : never

type FuncFoo = (arg: number) => void
type FuncBar = (...args: string[]) => void

type FooParameters = MyParameters<FuncFoo> // [number]
type FooFirstParameter = FirstParameter<FuncFoo> // number
type BarFirstParameter = FirstParameter<FuncBar> // string

// type ClassType = abstract new (...args: any) => any // 抽象类构造函数
interface ClassType<TInstanceType = any> {
  new (...args: any[]): TInstanceType
}
type MyConstructorParameters<T extends ClassType> = T extends abstract new (...args: infer P) => any ? P : never
type MyInstanceType<T extends ClassType> = T extends abstract new (...args: any) => infer R ? R : never // 其实就是构造函数的返回值

/* -------------------------------- 4.模式匹配工具类型 -------------------------------- */
