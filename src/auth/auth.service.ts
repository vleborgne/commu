import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../users/password.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('validateUser');
    const user = await this.usersService.findOneByEmail(email);

    console.log(pass, user.password, comparePassword(pass, user.password));
    if (user && (await comparePassword(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { email: string; password: string }) {
    const { email, password } = user;
    console.log('auth login');
    const validatedUser = await this.validateUser(email, password);
    if (validatedUser) {
      console.log('auth login val', validatedUser);

      const payload = { email, password };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
