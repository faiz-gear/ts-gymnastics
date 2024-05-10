import 'reflect-metadata'

class Foo {
  handler() {}
}

Reflect.defineMetadata('class:key', 'class metadata', Foo) // 类上定义元数据
Reflect.defineMetadata('method:key', 'handler metadata', Foo, 'handler') // 方法上定义元数据
Reflect.defineMetadata('proto:method:key', 'proto handler metadata', Foo.prototype, 'handler') // 原型方法上定义元数据

console.log(Reflect.getMetadata('class:key', Foo)) // class metadata;
console.log(Reflect.getMetadata('method:key', Foo, 'handler')) // handler metadata;
console.log(Reflect.getMetadata('proto:method:key', Foo.prototype, 'handler')) // proto handler metadata;
