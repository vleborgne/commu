import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  findOneByEmail(email: string): Promise<Token> {
    return this.tokenRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.tokenRepository.delete(id);
  }

  async generateToken(email: string): Promise<Token> {
    try {
      const random = randomBytes(16).toString('hex');
      const tokenToSave = this.tokenRepository.create({ email, token: random });
      return await this.tokenRepository.save(tokenToSave);
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
