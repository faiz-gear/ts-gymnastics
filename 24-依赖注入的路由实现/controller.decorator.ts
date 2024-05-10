import 'reflect-metadata'
import { METADATA_KEY } from './method.decorator'

export const Controller = (path?: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY.PATH, path, target)
  }
}
