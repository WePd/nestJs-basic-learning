import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'INTERN', 'ENGINERR'], {
    message: 'Valid role required',
  })
  role: 'ADMIN' | 'INTERN' | 'ENGINERR';
}
