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
