import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser-dto';
import { UpdateUserDto } from './dto/updataUser-dto';

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

  // 这里可以使用pipe（管道）的概念, 利用内置的方法
  // get /users/:id
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  // post /users
  @Post()
  CreateUser(@Body(ValidationPipe) users: CreateUserDto) {
    return this.usersService.createUser(users);
  }

  // patch /users/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userUpdate: UpdateUserDto,
  ) {
    return this.usersService.update(id, userUpdate);
  }

  // delete /users/:id
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
