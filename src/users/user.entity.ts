import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
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
  firstName: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ default: false })
  isActive: boolean;
}
