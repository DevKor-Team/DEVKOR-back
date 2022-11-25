import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Mbti, Position } from '../users.enum';

export class FetchUserDto {
  @IsEnum(Position)
  @IsOptional()
  position: Position;
}

export interface FetchUserParam {
  position?: Position;
}

export interface DuplicateCheckParam {
  name?: string;
  email?: string;
}
