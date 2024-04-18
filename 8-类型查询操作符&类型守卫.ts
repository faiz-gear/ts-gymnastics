/* --------------------------------- 类型查询操作符 -------------------------------- */
const func = (input: string) => {
  return input.length > 10
}

// boolean
type FuncReturnType = ReturnType<typeof func>


const isInputValid = (input: string) => {
  return input.length > 10;
}

// 不允许表达式
let isValid: typeof isInputValid("linbudu");

/* --------------------------------- 类型查询操作符 -------------------------------- */

/* ---------------------------------- 类型守卫 ---------------------------------- */
// is关键字定义类型守卫 显示定义input是string类型
function isString(input: unknown): input is string {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 正确了
    (input).replace("linbudu", "linbudu599")
  }
  if (typeof input === 'number') { }
  // ...
}


// 常用的类型守卫
type Falsy = false | "" | 0 | null | undefined
const isFalsy = (input: unknown): input is Falsy =>  {
  return !input;
}

type Primitive = string | number | boolean  | undefined
const isPrimitive = (input: unknown): input is Primitive => {
  return ["string", "number", "boolean", "undefined"].includes(typeof input);
}


// in操作符类型保护
// interface Foo {
//   foo: string;
//   fooOnly: boolean;
//   shared: number;
// }

// interface Bar {
//   bar: string;
//   barOnly: boolean;
//   shared: number;
// }

// function handle(input: Foo | Bar) {
//   if ('foo' in input) {
//     input.fooOnly;
//   } else {
//     input.barOnly;
//   }
// }


// 对于同名但不同类型的属性, typeof 做不到类型保护
interface Foo {
  kind: 'foo';
  diffType: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  kind: 'bar';
  diffType: number;
  barOnly: boolean;
  shared: number;
}

function handle1(input: Foo | Bar) {
  // if (input.kind === 'foo') {
  //   input.fooOnly;
  // } else {
  //   input.barOnly;
  // }
    // 报错，并没有起到区分的作用，在两个代码块中都是 Foo | Bar
  if (typeof input.diffType === 'string') {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}

// instanceof类型保护

class FooBase {}

class BarBase {}

class FooChild extends FooBase {
  fooOnly() {}
}
class BarChild extends BarBase {
  barOnly() {}
}

function handle(input: FooChild | BarChild) {
  if (input instanceof FooBase) {
    input.fooOnly();
  } else {
    input.barOnly();
  }
}

// 类型断言守卫
// 断言守卫与类型守卫的最大的不同点在于,判断条件不通过时,断言守卫会抛出异常,类型守卫只需要剔除掉预期的类型即可
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
let a: any = 123
assert(typeof a === "string", "a is not a string");
a.replace("1", "2");



let myName: any = 'linbudu';

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Not a number!');
  }
}

assertIsNumber(myName);

// number 类型！
myName.toFixed(2);


/* ---------------------------------- 类型守卫 ---------------------------------- */
