// ts模拟标称类型系统(添加元数据)
declare class TagProtector<T extends string> {
  protected __tag__: T
}

type Nominal<T, U extends string> = T & TagProtector<U> // 标称

export type CNY = Nominal<number, 'CNY'>

export type USD = Nominal<number, 'USD'>

const CNYCount = 100 as CNY

const USDCount = 100 as USD

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY
}

addCNY(CNYCount, CNYCount)

// 报错了！
addCNY(CNYCount, USDCount)
