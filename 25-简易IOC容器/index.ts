import { Container } from './container'
import { Inject, Provide } from './decorator'

@Provide()
class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}！===\n`)
  }
}

@Provide()
class Car {
  @Inject()
  driver!: Driver

  run() {
    this.driver.adapt('Car')
  }
}

const car = Container.get(Car)

car.run() // 驱动已生效于 Car ！
