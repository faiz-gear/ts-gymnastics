import 'reflect-metadata'

@Reflect.metadata('class:key', 'METADATA_IN_CLASS')
class Foo {
  constructor(name: string) {
    this.name = name
  }

  @Reflect.metadata('prop:key', 'METADATA_IN_PROPERTY')
  name!: string

  @Reflect.metadata('method:key', 'METADATA_IN_METHOD')
  add(source: number, input: number): number {
    return source + input
  }
}

console.log(Reflect.getMetadata('design:paramtypes', Foo))
console.log(Reflect.getMetadata('design:returntype', Foo.prototype, 'add'))
console.log(Reflect.getMetadata('design:type', Foo.prototype, 'add'))
console.log(Reflect.getMetadata('design:type', Foo.prototype, 'name'))
// 类型信息是来自于运行时，而非我们的类型标注。同时这些内置元数据取出的值是装箱类型对象，如 String、Number
