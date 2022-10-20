import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL || '',
      database: 'database',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
