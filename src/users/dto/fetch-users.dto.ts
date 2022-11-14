import { IsOptional, IsString } from 'class-validator';
import { Mbti, Position } from '../users.enum';

export class FetchUsersDto {
  @IsOptional()
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  position: Position;

  @IsOptional()
  mbti: Mbti;
}
export class FetchUsersParams {
  id?: number;

  name?: string;

  position?: Position;

  mbti?: Mbti;
}
