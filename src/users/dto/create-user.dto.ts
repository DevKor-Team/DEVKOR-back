import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Mbti, Position, Role } from '../users.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  major: string;

  @IsDate()
  birthDay: Date;

  @IsString()
  @IsOptional()
  github: string;

  @IsString()
  @IsOptional()
  blog: string;

  @IsString()
  @IsOptional()
  introduction: string;

  @IsString()
  @IsOptional()
  hobby: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsEnum(Position)
  @IsOptional()
  position: Position;

  @IsEnum(Mbti)
  @IsOptional()
  mbti: Mbti;
}

export interface CreateUserParam {
  name: string;

  major: string;

  birthDay: Date;

  github?: string;

  blog?: string;

  introduction?: string;

  hobby?: string;

  imageUrl?: string;

  role: Role;

  position?: Position;

  mbti?: Mbti;
}
