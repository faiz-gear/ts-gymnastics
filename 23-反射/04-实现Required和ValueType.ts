import 'reflect-metadata'

const requiredMetaDataKey = Symbol('required')
function Required() {
  return function (target: any, propertyKey: string) {
    const existingRequiredProperties: string[] = Reflect.getMetadata(requiredMetaDataKey, target) || []

    // 将元数据定义在类的原型对象上， 防止实例的属性不存在导致元数据丢失
    Reflect.defineMetadata(requiredMetaDataKey, [...existingRequiredProperties, propertyKey], target)
  }
}

enum TypeValidation {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean'
}

const validationMetadataKey = Symbol('expectedType')

function ValueType(type: TypeValidation): PropertyDecorator {
  return (target, prop) => {
    Reflect.defineMetadata(validationMetadataKey, type, target, prop)
  }
}

class CommonUser {
  @Required()
  name!: string

  @ValueType(TypeValidation.Number)
  age!: number
}

function validator(entity: any) {
  const clsName = entity.constructor.name
  const messages: string[] = [] // 先检查所有必填属性
  const requiredKeys: string[] = Reflect.getMetadata(requiredMetaDataKey, entity) // 基于反射拿到所有存在的属性

  // 获取所有的属性
  const existKeys = Reflect.ownKeys(entity)

  for (const key of requiredKeys) {
    if (!entity[key]) {
      messages.push(`${clsName}.${key} should be required.`) // throw new Error(`${key} is required!`);
    }
  }

  // 接着基于定义在属性上的元数据校验属性类型
  for (const key of existKeys) {
    const expectedType: string = Reflect.getMetadata(validationMetadataKey, entity, key)

    if (!expectedType) continue

    // 枚举也是对象，因此 Object.values 同样可以生效（只不过也会包括键名）
    // @ts-expect-error
    if (Object.values(TypeValidation).includes(expectedType)) {
      const actualType = typeof entity[key]
      if (actualType !== expectedType) {
        messages.push(`expect ${entity.constructor.name}.${String(key)} to be ${expectedType}, but got ${actualType}.`)
        // throw new Error(`${String(key)} is not ${expectedType}!`);
      }
    }
  }

  return messages
}

const user = new CommonUser()
// @ts-expect-error
user.age = '18'

const messages = validator(user)
console.log('🚀 ~ file: 04-实现Required和ValueType.ts ~ line 55 ~ messages', messages)
