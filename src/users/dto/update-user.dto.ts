import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Mbti, Position, Role } from '../users.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  major: string;

  @IsDate()
  @IsOptional()
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

export interface UpdateUserParam {
  major?: string;

  birthDay?: Date;

  github?: string;

  blog?: string;

  introduction?: string;

  hobby?: string;

  imageUrl?: string;

  position?: Position;

  mbti?: Mbti;
}

export class UpdateRoleDto {
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}

export interface UpdateRoleParam {
  role: Role;
}
