import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser-dto';
import { UpdateUserDto } from './dto/updataUser-dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  getAll(role?: 'ADMIN' | 'INTERN' | 'ENGINERR') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (!roleArray.length) {
        throw new NotFoundException('User Role not found');
      }
      return roleArray;
    } else {
      return this.users;
    }
  }

  getOne(id: number) {
    const user = this.users.filter((user) => user.id === id);

    if (!user) throw new NotFoundException('Use Not Found');

    return user;
  }

  createUser(user: CreateUserDto) {
    const newUser = {
      id: Math.random() * 1000,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  // 更新用户
  update(id: number, updateUserInfo: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserInfo };
      }
      return user;
    });

    return this.getOne(id);
  }

  // 删除
  deleteUser(id: number) {
    const removeUser = this.getOne(id);
    this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
