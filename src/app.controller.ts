import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get('user/all')
  async all() {
    return this.userService.findAll();
  }
  @Post('auth/create')
  async create() {
    return this.userService.add({
      email: 'vlb@attilab.io',
      firstName: 'admin1',
      lastName: 'admin1',
      password: 'admin',
      isActive: true,
    });
  }

  @Post('auth/login')
  async login(@Request() req) {
    console.log('login', req.body);

    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
