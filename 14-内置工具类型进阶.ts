/* ---------------------------------- 1.属性修饰 ---------------------------------- */
type DeepNonNullable<T> = {
  [k in keyof T]: T[k] extends object ? DeepNonNullable<T[k]> : NonNullable<T[k]>
}

type Nullable<T> = T | null
type DeepNullable<T> = {
  [k in keyof T]: T[k] extends object ? DeepNullable<T[k]> : Nullable<T[k]>
}

// 递归展开对象  & {} 能够更好的查看编辑器推断的类型
type Flatten<T> = {
  [KeyType in keyof T]: T[KeyType] extends object ? Flatten<T[KeyType]> : T[KeyType]
} & {}

// 基于已知属性的部分修饰
type MarkPropsAsOptional<T extends object, K extends keyof T = keyof T> = Flatten<Partial<Pick<T, K>> & Omit<T, K>>
type MarkPropsAsOptionalStruct = MarkPropsAsOptional<
  {
    foo: string
    bar: number
    baz: boolean
  },
  'foo' | 'bar'
>

type MarkPropsAsRequired<T extends object, K extends keyof T = keyof T> = Flatten<Omit<T, K> & Required<Pick<T, K>>>
type MarkPropsAsRequiredStruct = MarkPropsAsRequired<
  {
    foo?: string
    bar?: number
    baz?: boolean
  },
  'foo' | 'bar'
>

type MarkPropsAsReadonly<T extends object, K extends keyof T = keyof T> = Flatten<Omit<T, K> & Readonly<Pick<T, K>>>
type MarkPropsAsReadonlyStruct = MarkPropsAsReadonly<
  {
    foo: string
    bar: number
    baz: boolean
  },
  'foo' | 'bar'
>

type MarkPropsAsMutable<T extends object, K extends keyof T = keyof T> = Flatten<Omit<T, K> & Mutable<Pick<T, K>>>
type MarkPropsAsMutableStruct = MarkPropsAsMutable<
  {
    readonly foo: string
    readonly bar: number
    readonly baz: boolean
  },
  'foo' | 'bar'
>

type MarkPropsAsNullable<T extends object, K extends keyof T = keyof T> = Flatten<Omit<T, K> & DeepNullable<Pick<T, K>>>
type MarkPropsAsNullableStruct = MarkPropsAsNullable<
  {
    foo: string
    bar: number
    baz: boolean
  },
  'foo' | 'bar'
>

type MarkPropsAsNonNullable<T extends object, K extends keyof T = keyof T> = Flatten<
  Omit<T, K> & DeepNonNullable<Pick<T, K>>
>
type MarkPropsAsNonNullableStruct = MarkPropsAsNonNullable<
  {
    foo: string | null
    bar: number | undefined
    baz: boolean
  },
  'foo' | 'bar'
>

/* ---------------------------------- 1.属性修饰 ---------------------------------- */

/* --------------------------------- 2.结构工具类型 --------------------------------- */
// 从object中获取符合期望类型的key
type ExpectedPropKeys<T extends object, ValueType> = {
  [K in keyof T]-?: T[K] extends ValueType ? K : never
}[keyof T]

type FuncStruct = (...args: any[]) => any
type FunctionKeys<T extends object> = ExpectedPropKeys<T, FuncStruct>

type FunctionKeysStruct = FunctionKeys<{ foo: () => void; bar: () => number; baz: number }>

// 结合Pick, 提取符合期望类型的属性构成的新对象
// type PickByValueType<T extends object, ValueType> = Pick<T, ExpectedPropKeys<T, ValueType>>

type PickByValueTypeStruct = PickByValueType<{ foo: string; bar: number }, string>
type PickByValueTypeStruct2 = PickByValueType<{ foo: string; bar: number; baz: boolean }, string | number>

// 从object中提取不符合期望类型的key
type FilteredPropKeys<T extends object, ValueType> = {
  [K in keyof T]-?: T[K] extends ValueType ? never : K
}[keyof T]
// type OmitByValueType<T extends object, ValueType> = Pick<T, FilteredPropKeys<T, ValueType>>

type OmitByValueTypeStruct = OmitByValueType<{ foo: string; bar: number }, string>
type OmitByValueTypeStruct2 = OmitByValueType<{ foo: string; bar: number; baz: boolean }, string | number>

// 合并ExpectedPropKeys和FilteredPropKeys
type Conditional<Value, Conditional, Resolved, Rejected> = Value extends Conditional ? Resolved : Rejected

type ValueTypeFilter<T extends object, ValueType, Positive extends boolean> = {
  [K in keyof T]-?: T[K] extends ValueType
    ? Conditional<Positive, true, K, never>
    : Conditional<Positive, true, never, K>
}[keyof T]
export type PickByValueType<T extends object, ValueType> = Pick<T, ValueTypeFilter<T, ValueType, true>>

export type OmitByValueType<T extends object, ValueType> = Pick<T, ValueTypeFilter<T, ValueType, false>>

type StrictConditional<A, B, Resolved, Rejected, Fallback = never> = [A] extends [B]
  ? [B] extends [A]
    ? Resolved
    : Rejected
  : Fallback // 避免分布式条件类型, 同时反向比较, 避免 1 | 2 extends 1 | 2 | 3 的情况

type Res1 = StrictConditional<1 | 2, 1 | 2 | 3, true, false> // false
type Res2 = StrictConditional<1 | 2 | 3, 1 | 2, true, false, false> // false
type Res3 = StrictConditional<1 | 2, 1 | 2, true, false> // true

type StrictValueTypeFilter<T extends object, ValueType, Positive extends boolean = true> = {
  [Key in keyof T]-?: StrictConditional<
    ValueType,
    T[Key],
    // 为了避免嵌套太多工具类型，这里就不使用 Conditional 了
    Positive extends true ? Key : never,
    Positive extends true ? never : Key,
    Positive extends true ? never : Key
  >
}[keyof T]

type StrictPickByValueType<T extends object, ValueType> = Pick<T, StrictValueTypeFilter<T, ValueType, true>>
type StrickPickByValueTypeStruct = StrictPickByValueType<{ foo: 1 | 2 | 3; bar: 1 | 2; baz: 1 }, 1 | 2>

type StrictOmitByValueType<T extends object, ValueType> = Pick<T, StrictValueTypeFilter<T, ValueType, false>>
type StrictOmitByValueTypeStruct = StrictOmitByValueType<{ foo: 1 | 2 | 3; bar: 1 | 2; baz: 1 }, 1 | 2>

/* ------------------------------- 基于结构的互斥工具类型 ------------------------------ */

interface VIP {
  vipExpires: number
}

interface CommonUser {
  promotionUsed: boolean
}

type User = VIP | CommonUser

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T)

type XORUser = XOR<VIP, CommonUser>

// 互斥, 只能有一个
const user: XORUser = {
  vipExpires: 123
  // promotionUsed: true
}

// 实现绑定效果, 要么都有, 要么都没有
type XORStruct = XOR<{}, { foo: string; bar: number }>
const xorStruct: XORStruct = {
  // foo: 'foo',
  // bar: 123
}

/* ------------------------------- 基于结构的互斥工具类型 ------------------------------ */

/* --------------------------------- 2.结构工具类型 --------------------------------- */

/* ------------------------------- 3.集合工具类型进阶 ------------------------------- */

// 一维集合
// 并集
export type Concurrence<A, B> = A | B

// 交集
export type Intersection<A, B> = A extends B ? A : never

// 差集
export type Difference<A, B> = A extends B ? never : A

// 补集
export type Complement<A, B extends A> = Difference<A, B>

// 使用更精确的对象类型描述结果
type PlainObjectType = Record<string, any>

// 属性名并集
type ObjectKeysConcurrence<T extends PlainObjectType, U extends PlainObjectType> = keyof T | keyof U

// 属性名交集
type ObjectKeysIntersections<T extends PlainObjectType, U extends PlainObjectType> = Intersection<keyof T, keyof U>

// 属性名差集
type ObjectKeysDifference<T extends PlainObjectType, U extends PlainObjectType> = Difference<keyof T, keyof U>

// 属性名补集
type ObjectKeysComplement<T extends U, U extends PlainObjectType> = Complement<keyof T, keyof U>

// merge
type Merge<T extends PlainObjectType, U extends PlainObjectType> =
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高，再加上 U 比 T 多的部分即可
  ObjectKeysDifference<T, U> & ObjectKeysIntersections<T, U> & ObjectKeysDifference<U, T>

type Assign<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 T 优先级更高，再加上 U 比 T 多的部分即可
> = ObjectKeysDifference<T, U> & ObjectKeysIntersections<T, U> & ObjectKeysDifference<U, T>

type Override<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T比U多的部分, 加上T 与 U交集的部分(类型不同则以 U 优先级更高)
> = ObjectKeysDifference<T, U> & ObjectKeysIntersections<U, T>
/* ------------------------------- 3.集合工具类型进阶 ------------------------------- */

/* ------------------------------ 4.模式匹配工具类型进阶 ------------------------------ */
type FirstParameter<T extends FunctionType> = T extends (arg: infer P, ...args: any) => any ? P : never

type LastParameter<T extends FunctionType> = T extends (arg: infer P) => any
  ? P
  : T extends (...args: infer R) => any
  ? R extends [...any, infer Q]
    ? Q
    : never
  : never

// 这样不行
// type LastParameter<T extends FunctionType> = T extends (...args: infer P) => any
//   ? P extends [...any, infer R]
//     ? R
//     : never
//   : never

type FuncFoo = (arg: number) => void
type FuncBar = (...args: string[]) => void
type FuncBaz = (arg1: string, arg2: boolean) => void

type FooLastParameter = LastParameter<FuncFoo> // number
type BarLastParameter = LastParameter<FuncBar> // string
type BazLastParameter = LastParameter<FuncBaz> // boolean

type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any[]) => any
    ? Awaited<V>
    : never
  : T
/* ------------------------------ 4.模式匹配工具类型进阶 ------------------------------ */
