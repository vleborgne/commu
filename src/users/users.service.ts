import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from './password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async add(user: User): Promise<User> {
    try {
      console.log('add User');

      const userToSave = this.usersRepository.create({
        ...user,
        password: await hashPassword(user.password),
        isActive: false,
      });
      return await this.usersRepository.save(userToSave);
    } catch (error) {
      console.error(error);

      if (error.code === 11000) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      } else {
        throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
