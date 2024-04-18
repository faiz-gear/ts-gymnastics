/* ------------------------------ never类型进行类型检查 ----------------------------- */
// declare const strOrNumOrBool: string | number | boolean
declare const strOrNumOrBool: string | number | boolean | { foo: () => {} } // 新增类型,则在下面的代码块中会出现类型错误

if (typeof strOrNumOrBool === 'string') {
  console.log('str!')
} else if (typeof strOrNumOrBool === 'number') {
  console.log('num!')
} else if (typeof strOrNumOrBool === 'boolean') {
  console.log('bool!')
} else {
  const _exhaustiveCheck: never = strOrNumOrBool
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`)
}

/* ------------------------------ never类型进行类型检查 ----------------------------- */

/* ----------------------------- 类型断言作为代码提示的辅助工具 ---------------------------- */
interface IStruct {
  foo: string
  bar: {
    barPropA: string
    barPropB: number
    barMethod: () => void
    baz: {
      handler: () => Promise<void>
    }
  }
}

const obj: IStruct = {} // 会报错

// as类型断言的另一种写法
const obj2 = <IStruct>{} // 不会报错

const obj3 = {} as IStruct // 不会报错

/* ----------------------------- 类型断言作为代码提示的辅助工具 ---------------------------- */
