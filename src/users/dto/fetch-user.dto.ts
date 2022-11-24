import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Mbti, Position } from '../users.enum';

export class FetchUserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(Position)
  position: Position;

  @IsOptional()
  @IsEnum(Mbti)
  mbti: Mbti;
}

export class FetchUserParam {
  id?: number;

  name?: string;

  position?: Position;

  mbti?: Mbti;
}
