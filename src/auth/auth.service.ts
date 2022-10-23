import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../users/password.util';
import { LoginDTO } from './controller/login.dto';
import { User } from '../users/user.entity';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await comparePassword(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDTO) {
    const { email, password } = user;
    const validatedUser = await this.validateUser(email, password);
    if (validatedUser) {
      const payload = { email, password };
      delete validatedUser.password;
      return {
        access_token: this.jwtService.sign(payload),
        user: validatedUser,
      };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async registerUser(user: User) {
    const savedUser = await this.usersService.add(user);
    const token = await this.tokenService.generateToken(user.email);
    this.emailService.sendActivationEmail(token.email, token.token);
    return savedUser;
  }
}
