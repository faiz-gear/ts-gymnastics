import 'reflect-metadata'

@Reflect.metadata('class:key', 'METADATA_IN_CLASS')
class Foo {
  @Reflect.metadata('prop:key', 'METADATA_IN_PROPERTY')
  public prop: string = 'faiz'

  @Reflect.metadata('method:key', 'METADATA_IN_METHOD')
  public handler(): void {}
}
