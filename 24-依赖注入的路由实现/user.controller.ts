import { Controller } from './controller.decorator'
import { Get, Post } from './method.decorator'

const users = [
  { name: 'tom', age: 18 },
  { name: 'jerry', age: 20 }
]

@Controller('/user')
export class UserController {
  @Get('/list')
  async userList() {
    return users
  }

  @Post('/add')
  async addUser() {
    users.push({ name: 'jack', age: 22 })
    return { success: true }
  }
}
