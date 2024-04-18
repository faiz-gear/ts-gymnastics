/* ---------------------------- 字面量类型extends原始类型 ---------------------------- */
type Result1 = 'linbudu' extends string ? 1 : 2 // 1
type Result2 = 1 extends number ? 1 : 2 // 1
type Result3 = true extends boolean ? 1 : 2 // 1
type Result4 = { name: string } extends object ? 1 : 2 // 1
type Result5 = { name: 'linbudu' } extends object ? 1 : 2 // 1
type Result6 = [] extends object ? 1 : 2 // 1

/* ----------------- 字面量类型extends包含此字面量类型的联合类型extends对应的原始类型 ---------------- */
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2 // 1
type Result8 = 'lin' extends 'lin' | 'bu' | 'du' ? 1 : 2 // 1
type Result9 = true extends true | false ? 1 : 2 // 1
type Result11 = 'lin' | 'bu' | 'budu' extends string ? 1 : 2 // 1
type Result12 = {} | (() => void) | [] extends object ? 1 : 2 // 1
// 2
type Result13 = 'linbudu' extends 'linbudu' | '599' ? ('linbudu' | '599' extends string ? 2 : 1) : 0

/* ---------------------------------- 装箱类型 ---------------------------------- */
type Result14 = string extends String ? 1 : 2 // 1
type Result15 = String extends {} ? 1 : 2 // 1
type Result16 = {} extends object ? 1 : 2 // 1
type Result18 = object extends Object ? 1 : 2 // 1

type Result17 = object extends Object ? 1 : 2 // 1
type Result20 = Object extends object ? 1 : 2 // 1
/**
 * 而 object extends Object 和 Object extends object 这两者的情况就要特殊一些，它们是因为“系统设定”的问题，Object 包含了所有除 Top Type 以外的类型（基础类型、函数类型等），object 包含了所有非原始类型的类型，即数组、对象与函数类型，这就导致了你中有我、我中有你的神奇现象。
 */
type Result19 = Object extends {} ? 1 : 2 // 1
type Result21 = {} extends Object ? 1 : 2 // 1

/* -------------------------------- Top Type -------------------------------- */
type Result22 = Object extends any ? 1 : 2 // 1
type Result23 = Object extends unknown ? 1 : 2 // 1

type Result24 = any extends Object ? 1 : 2 // 1 | 2
type Result25 = unknown extends Object ? 1 : 2 // 2

type Result26 = any extends 'linbudu' ? 1 : 2 // 1 | 2
type Result27 = any extends string ? 1 : 2 // 1 | 2
type Result28 = any extends {} ? 1 : 2 // 1 | 2
type Result29 = any extends never ? 1 : 2 // 1 | 2

type Result31 = any extends unknown ? 1 : 2 // 1
type Result32 = unknown extends any ? 1 : 2 // 1

/* ------------------------------- Bottom Type ------------------------------ */
type Result33 = never extends 'linbudu' ? 1 : 2 // 1
type Result34 = undefined extends 'linbudu' ? 1 : 2 // 2
type Result35 = null extends 'linbudu' ? 1 : 2 // 2
type Result36 = void extends 'linbudu' ? 1 : 2 // 2
type Result37 = never extends 123 ? 1 : 2 // 1

/* ---------------------------------- 类型层级链 --------------------------------- */
type VerboseTypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | 'budulin'
    ? 'linbudu' | 'budulin' extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8
