import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class LoginSuccessDTO {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  user: User;
}
