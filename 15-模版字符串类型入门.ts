type World = 'World'

type Greeting = `Hello, ${World}` // 'Hello, World'

type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`

type Greet1 = Greet<'linbudu'> // "Hello linbudu"
type Greet2 = Greet<599> // "Hello 599"
type Greet3 = Greet<true> // "Hello true"
type Greet4 = Greet<null> // "Hello null"
type Greet5 = Greet<undefined> // "Hello undefined"
type Greet6 = Greet<0x1fffffffffffff> // "Hello 9007199254740991"

/* ---------------------------------- 版本号使用 --------------------------------- */
type Version = `${number}.${number}.${number}`

const v1: Version = '1.0.0'

// const v2: Version = '1.0' // Error: Type '"1.0"' is not assignable to type 'Version'
/* ---------------------------------- 版本号使用 --------------------------------- */

/* ---------------------------------- 品牌类型 ---------------------------------- */
type Brand = 'iphone' | 'xiaomi' | 'huawei'
type Memory = 64 | 128 | 256
type Color = 'black' | 'white' | 'blue'

type SKU = `${Brand} ${Memory}GB ${Color}`

// 利用Exclude类型过滤指定SKU
type ExcludeSKU = Exclude<SKU, 'iphone 64GB black'> // "xiaomi 128GB white" | "huawei 256GB blue"
const sku: ExcludeSKU = 'xiaomi 128GB white'
// const sku2: ExcludeSKU = 'iphone 64GB black'

// 利用差集类型剔除指定SKU
type Difference<T, U> = T extends U ? never : T
type DifferenceSKU = Difference<SKU, 'iphone 64GB black'> // "xiaomi 128GB white" | "huawei 256GB blue"
const sku3: DifferenceSKU = 'huawei 256GB blue'
// const sku4: DifferenceSKU = 'iphone 64GB black'
/* ---------------------------------- 品牌类型 ---------------------------------- */

/* --------------------------- 泛型传入模版字符串类型时会有分发过程 --------------------------- */
type SizeRecord<T extends string> = `${T}-Record`
type Size = 'S' | 'M' | 'L' | 'XL'

type AllSizeRecord = SizeRecord<Size>

/* --------------------------- 泛型传入模版字符串类型时会有分发过程 --------------------------- */

const greet = (to: string): `Hello, ${string}` => `Hello, ${to}`

/* --------------------------------- 结合索引类型 --------------------------------- */
interface Params {
  name: string
  age: number
  job: {
    name: string
  }
}

type ChangeListener = {
  on: (change: `${keyof Params}Changed`) => void
}
declare let listener: ChangeListener
listener.on('ageChanged')
/* --------------------------------- 结合索引类型 --------------------------------- */

/* --------------------------------- 结合映射类型 --------------------------------- */
type CopyAndRename<T extends object> = {
  // 通过 as 关键字将新属性名拼接, 由于键名还有可能是symbol, 所以需要使用string & K
  [K in keyof T as `new_${string & K}`]: T[K]
}
type NewParams = CopyAndRename<Params>
/* --------------------------------- 结合映射类型 --------------------------------- */

/* ---------------------------- 专用于字符串字面量类型的工具类型 ---------------------------- */
type Heavy<T extends string> = `${Uppercase<T>}`
type Respect<T extends string> = `${Capitalize<T>}`

type HeavyName = Heavy<'linbudu'> // "LINBUDU"
type RespectName = Respect<'linbudu'> // "Linbudu"

type CopyAndRenameAndCapitalize<T extends object> = {
  [K in keyof T as Respect<`${string & K}`>]: T[K]
}

type NewParams2 = CopyAndRenameAndCapitalize<Params>

/* ---------------------------- 专用于字符串字面量类型的工具类型 ---------------------------- */

/* -------------------------- 模版字符串类型结合infer进行类型提取 -------------------------- */
type ReverseName<S extends string> = S extends `${infer FirstName} ${infer LastName}`
  ? `${Capitalize<LastName>} ${FirstName}`
  : S

type ReversedTomHardy = ReverseName<'Tom hardy'> // "Hardy Tom"
type ReversedLinbudu = ReverseName<'Budu Lin'> // "Lin Budu"
type ReverseTomHardyBaby = ReverseName<'Tom Hardy Baby'> // "Hardy Baby Tom"

declare function handler<T extends string>(arg: `Who is ${T}`): T

const who = handler('Who is Linbudu') // "Linbudu"
const who1 = handler('Who is Tom Hardy') // "Tom Hardy"

/* -------------------------- 模版字符串类型结合infer进行类型提取 -------------------------- */
