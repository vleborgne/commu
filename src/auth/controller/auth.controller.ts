import { Controller, Post, UseGuards, Get, Body, Param } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { LoginDTO, LoginSuccessDTO } from './login.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { User } from '../../users/user.entity';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/create')
  async create(@Body() user: User) {
    return this.authService.registerUser(user);
  }

  @Get('auth/activate/:token')
  async activate(@Param() params) {
    return this.authService.activateUser(params.token);
  }

  @ApiExtraModels(LoginSuccessDTO)
  @ApiResponse({
    status: 202,
    schema: {
      $ref: getSchemaPath(LoginSuccessDTO),
    },
  })
  @Post('auth/login')
  async login(@Body() user: LoginDTO) {
    return await this.authService.login(user);
  }

  @ApiExtraModels(User)
  @ApiResponse({
    status: 202,
    schema: {
      $ref: getSchemaPath(User),
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  getProfile(@Param() params) {
    return params.id;
  }
}
