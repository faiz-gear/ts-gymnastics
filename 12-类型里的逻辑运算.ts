/* --------------------------------- 条件类型基础 --------------------------------- */
type LiteralToPrimitive<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends bigint
  ? bigint
  : T

function universalAdd<T extends number | string | bigint>(a: T, b: T): LiteralToPrimitive<T> {
  return a + (b as any)
}
const n = universalAdd(1, 2) // 3
const s = universalAdd('1', '2') // '12'
const big = universalAdd(10n, 20n) // 30n
/* --------------------------------- 条件类型基础 --------------------------------- */

/* ----------------------------- infer在条件类型中提取类型 ---------------------------- */
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T
type SwappedResult1 = Swap<[1, 2]> // [2, 1]
type SwappedResult2 = Swap<[1, 2, 3]> // [1, 2, 3]

// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [infer Start, ...any[], infer End] ? [Start, End] : T
type ExtractedResult1 = ExtractStartAndEnd<[1, 2, 3]> // [1, 3]

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [infer Start, ...infer Left, infer End] ? [End, ...Left, Start] : T
type SwapStartAndEndResult1 = SwapStartAndEnd<[1, 2, 3, 4]> // [4, 2, 3, 1]

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [infer A, infer B, ...infer Rest] ? [B, A, ...Rest] : T
type SwapFirstTwoResult1 = SwapFirstTwo<[1, 2, 3, 4]> // [2, 1, 3, 4]

// 数组到联合类型
type ArrayItemType<T> = T extends (infer U)[] ? U : never
type ArrayItemResult1 = ArrayItemType<[]> // never
type ArrayItemResult2 = ArrayItemType<string[]> // string
type ArrayItemResult3 = ArrayItemType<[string, number]> // string | number

// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never
type PropTypeResult1 = PropType<{ a: string; b: number }, 'a'> // string
type PropTypeResult2 = PropType<{ a: string; b: number }, 'b'> // number
type PropTypeResult3 = PropType<{ a: string; b: number }, 'a' | 'b'> // string | number

// 反转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V>
  ? Record<V & string, K>
  : never
type ReverseKeyValueResult1 = ReverseKeyValue<{ a: 'hello'; b: 'world' }> // { hello: 'a'; world: 'b' }

// 提取Promise的返回值
type PromiseValue<T> = T extends Promise<infer V> ? V : T
type PromiseValueResult1 = PromiseValue<Promise<number>> // number
type PromiseValueResult2 = PromiseValue<number> // number，但并没有发生提取
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>> // Promise<boolean>，只提取了一层
// 递归提出Promise的返回值
type DeepPromiseValue<T> = T extends Promise<infer V> ? DeepPromiseValue<V> : T
type DeepPromiseValueResult1 = DeepPromiseValue<Promise<Promise<number>>> // number

// infer约束
type FirstArrayItemType<T extends any[]> = T extends [infer P extends string, ...any[]] ? P : never
type FirstArrayItemTypeResult1 = FirstArrayItemType<[string, number, boolean]> // string
type FirstArrayItemTypeResult2 = FirstArrayItemType<[number, boolean]> // never

/* ----------------------------- infer在条件类型中提取类型 ---------------------------- */

/* --------------------------------- 分布式条件类型, 条件类型的分布式特性(产生分布式特性的条件: 通过泛型传入;裸类型参数, 如没有被数组包裹) -------------------------------- */
type Naked<T> = T extends boolean ? 'Y' : 'N'
type NotNaked<T> = [T] extends [boolean] ? 'Y' : 'N'
type NotNaked2<T> = T & {} extends boolean ? 'Y' : 'N'

// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
type Res = Naked<number | boolean>

// 对比
type ResNotGeneric = number | boolean extends boolean ? 'Y' : 'N' // "N", 由于没有泛型传入，所以不会产生分布式特性
type ResNotNaked = NotNaked<number | boolean> // "N", 由于没有裸类型参数，所以不会产生分布式特性
type ResNotNaked2 = NotNaked2<number | boolean> // "N", 由于没有裸类型参数，所以不会产生分布式特性

// 实际应用
type Intersection<A, B> = A extends B ? A : never

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4> // 2 | 3
/* --------------------------------- 分布式条件类型,  条件类型的分布式特性 -------------------------------- */
