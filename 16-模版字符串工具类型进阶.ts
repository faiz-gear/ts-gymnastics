/* ------------------------------- 1.实现Include ------------------------------ */
type _Include<Str extends string, Search extends string> = Str extends `${infer _Start}${Search}${infer _End}`
  ? true
  : false

// 处理传入 '' 的情况
type Include<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : false
  : _Include<Str, Search>

type IncludeRes1 = Include<'FaizGear', 'fa'> // false
type IncludeRes2 = Include<'FaizGear', 'Fa'> // true
type IncludeRes3 = Include<'FaizGear', '_Fa'> // false
type IncludeRes4 = Include<' ', ''> // true
type IncludeRes5 = Include<'', ''> // true

/* ------------------------------- 1.实现Include ------------------------------ */

/* ---------------------- 2.实现Trim, TrimLeft, TrimRight --------------------- */
type TrimLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimLeft<Rest> : Str

type TrimRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimRight<Rest> : Str

type Trim<Str extends string> = TrimLeft<TrimRight<Str>>

type TrimRes1 = Trim<'  FaizGear  '> // 'FaizGear'
/* ---------------------- 2.实现Trim, TrimLeft, TrimRight --------------------- */

/* ------------------------ 3.实现StartsWith, EndsWith ------------------------ */
type _StartsWith<Str extends string, Search extends string> = Str extends `${Search}${infer _Rest}` ? true : false
type StartsWith<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : false
  : _StartsWith<Str, Search>
type _EndsWith<Str extends string, Search extends string> = Str extends `${infer _Start}${Search}` ? true : false
type EndsWith<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : false
  : _EndsWith<Str, Search>

type StartsWithRes1 = StartsWith<'FaizGear', 'Fa'> // true
type StartsWithRes2 = StartsWith<'FaizGear', 'Gear'> // false
type StartsWithRes3 = StartsWith<'', ''> // true
type EndsWithRes1 = EndsWith<'FaizGear', 'Gear'> // true
type EndsWithRes2 = EndsWith<'FaizGear', 'Fa'> // false
type EndsWithRes3 = EndsWith<'', ''> // true
/* ------------------------ 3.实现StartsWith, EndsWith ------------------------ */

/* ------------------------------- 4.实现Replace, ReplaceAll ------------------------------ */
// type Replace<
//   Str extends string,
//   Search extends string,
//   Replacement extends string
// > = Str extends `${infer Head}${Search}${infer Tail}` ? `${Head}${Replacement}${Tail}` : Str

// type ReplaceRes1 = Replace<'FaizGear', 'Faiz', 'Lyle'> // 'LyleGear'

type ReplaceAll<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? `${ReplaceAll<Head, Search, Replacement>}${Replacement}${ReplaceAll<Tail, Search, Replacement>}`
  : Str

type ReplaceAllRes1 = ReplaceAll<'FaizGearFaizGear', 'Faiz', 'Lyle'> // 'LyleGearLyleGear'

type Replace<
  Str extends string,
  Search extends string,
  Replacement extends string,
  ShouldReplaceAll extends boolean
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? ShouldReplaceAll extends true
    ? Replace<`${Head}${Replacement}${Tail}`, Search, Replacement, true>
    : `${Head}${Replacement}${Tail}`
  : Str

type ReplaceRes1 = Replace<'FaizGearFaizGear', 'Faiz', 'Lyle', true> // 'LyleGearLyleGear'
type ReplaceRes2 = Replace<'FaizGearFaizGear', 'Faiz', 'Lyle', false> // 'LyleGearFaizGear'

/* ------------------------------- 4.实现Replace, ReplaceAll ------------------------------ */

/* -------------------------------- 5.实现Split ------------------------------- */
type Split<Str extends string, Separator extends string> = Str extends `${infer Head}${Separator}${infer Tail}`
  ? [Head, ...Split<Tail, Separator>]
  : Str extends Separator
  ? []
  : [Str]

type SplitRes1 = Split<'FaizGear FaizGear', ' '> // ["FaizGear", "FaizGear"]
type SplitRes2 = Split<'Faiz,Gear,Lyle', ','> // ["Faiz", "Gear", "Lyle"]
type SplitRes3 = Split<'FaizGear', ''> // ["F", "a", "i", "z", "G", "e", "a", "r"]

type Separators = '_' | '-' | ' '
type SplitRes4 = Split<'Faiz_Gear_Lyle', Separators> // ["Faiz", "Gear", "Lyle"]
// 不能在一个字符中混用多个分隔符, 会得到一个诡异的结果.此时应该先处理一个分隔符, 然后再处理另一个分隔符
type SplitRes5 = Split<'Faiz-Gear_Lyle', Separators> //  ["Faiz" | "Faiz-Gear", "Lyle"] | ["Faiz" | "Faiz-Gear", "Gear", "Lyle"]
/* -------------------------------- 5.实现Split ------------------------------- */

/* -------------------------------- 6.实现Join -------------------------------- */
type Join<List extends Array<string | number>, Separator extends string> = List extends []
  ? ''
  : List extends [string | number]
  ? `${List[0]}`
  : List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Separator}${Join<Rest, Separator>}`
  : string

// `lin-bu-du-${string}`
type JoinRes1 = Join<['lin', 'bu', 'du'], '-'>

/* -------------------------------- 6.实现Join -------------------------------- */

/* ------------------------- 7.实现SnakeCase2CamelCase,KebabCase2CamelCase ------------------------ */
type SnakeCase2CamelCase<Str extends string> = Str extends `${infer Head}_${infer Rest}`
  ? `${Head}${Capitalize<SnakeCase2CamelCase<Rest>>}`
  : Str

type SnakeCase2CamelCaseRes1 = SnakeCase2CamelCase<'faiz_gear_lyle'> // 'faizGearLyle'

type KebabCase2CamelCase<S extends string> = S extends `${infer Head}${'-'}${infer Rest}`
  ? `${Head}${KebabCase2CamelCase<Capitalize<Rest>>}`
  : S

type KebabCase2CamelCaseRes1 = KebabCase2CamelCase<'faiz-gear-lyle'> // 'faizGearLyle'

// 抽象出一个工具类型DelimiterCase2CamelCase
type DelimiterCase2CamelCase<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Rest}`
  ? `${Head}${Capitalize<DelimiterCase2CamelCase<Rest, Delimiter>>}`
  : S

type DelimiterCase2CamelCaseRes1 = DelimiterCase2CamelCase<'faiz-gear-lyle', '-'> // 'faizGearLyle'
type DelimiterCase2CamelCaseRes2 = DelimiterCase2CamelCase<'faiz_gear_lyle', '_'> // 'faizGearLyle'

/* ------------------------- 7.实现SnakeCase2CamelCase ------------------------ */

/* ------------------------------ 8.实现CamelCase ----------------------------- */
type Delimiters = '-' | '_' | ' '

// type CapitalizeStringArray<Words extends any[]> = Words extends [`${infer First}`, ...infer Rest]
//   ? `${Capitalize<First>}${CapitalizeStringArray<Rest>}`
//   : ''

// type CamelCaseStringArray<Words extends string[]> = Words extends [`${infer First}`, ...infer Rest]
//   ? `${First}${CapitalizeStringArray<Rest>}`
//   : never

// type CamelCase<K extends string> = CamelCaseStringArray<Split<K, Delimiters>>

// 处理边界情况 'Foo-bar-baz' 'FOO-BAR-BAZ'
export type PlainObjectType = Record<string, any>

export type WordSeparators = '-' | '_' | ' '

type CapitalizeStringArray<Words extends readonly any[], Prev> = Words extends [`${infer First}`, ...infer Rest]
  ? First extends undefined
    ? ''
    : First extends ''
    ? CapitalizeStringArray<Rest, Prev>
    : `${Prev extends '' ? First : Capitalize<First>}${CapitalizeStringArray<Rest, First>}`
  : ''

type CamelCaseStringArray<Words extends readonly string[]> = Words extends [`${infer First}`, ...infer Rest]
  ? Uncapitalize<`${First}${CapitalizeStringArray<Rest, First>}`>
  : never

type CamelCase<K extends string> = CamelCaseStringArray<
  Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
>

type CamelCaseRes1 = CamelCase<'faiz-gear-lyle'> // 'faizGearLyle'
type CamelCaseRes2 = CamelCase<'faiz_gear_lyle'> // 'faizGearLyle'
type CamelCaseRes3 = CamelCase<'faiz gear lyle'> // 'faizGearLyle'

/* ------------------------------ 8.实现CamelCase ----------------------------- */
