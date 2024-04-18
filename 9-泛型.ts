/* ----------------------------- const let的类型推断 ----------------------------- */
function handle<T>(input: T): T {}

const author = 'linbudu' // 使用 const 声明，被推导为 "linbudu"

let authorAge = 18 // 使用 let 声明，被推导为 number

const res1 = handle(author) // 填充为字面量类型 "linbudu"
const res2 = handle(authorAge) // 填充为基础类型 number
/* ----------------------------- const let的类型推断 ----------------------------- */

/* ------------------------------- 对返回值类型进行操作 ------------------------------- */
function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start]
}

const swapped1 = swap(['linbudu', 599])
const swapped2 = swap([null, 599])
const swapped3 = swap([{ name: 'linbudu' }, {}])
/* ------------------------------- 对返回值类型进行操作 ------------------------------- */

/* --------------------------------- pick函数 --------------------------------- */
const pick = <T extends object, U extends keyof T>(object: T, props: U[]): Pick<T, U> => {
  const result = {} as Pick<T, U>
  props.forEach((prop) => {
    result[prop] = object[prop]
  })
  return result
}
/* --------------------------------- pick函数 --------------------------------- */

/* ------------------------------- 函数内部逻辑消费泛型 ------------------------------- */
function handle<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload])
  })
}
/* ------------------------------- 函数内部逻辑消费泛型 ------------------------------- */
