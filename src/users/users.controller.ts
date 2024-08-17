import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Get   /users   or   /users?role=value
  @Get()
  getAll(@Query('role') role?: 'ADMIN' | 'INTERN' | 'ENGINERR') {
    return this.usersService.getAll(role);
  }

  // get  /users/interns
  @Get('interns')
  findAllInterns() {
    return this.getAll();
  }

  // get /users/:id
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOne(+id);
  }

  // post /users
  @Post()
  CreateUser(@Body() users: UserType) {
    return this.usersService.createUser(users);
  }

  // patch /users/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: Partial<UserType>) {
    return this.usersService.update(+id, userUpdate);
  }

  // delete /users/:id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
