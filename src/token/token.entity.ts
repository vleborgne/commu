import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Token {
  @ApiProperty()
  @ObjectIdColumn()
  id?: string;

  @ApiProperty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  token: string;
}
