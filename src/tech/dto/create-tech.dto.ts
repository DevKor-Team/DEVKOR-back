import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  postGroup: string;

  @IsNotEmpty()
  @IsString()
  contents: string;
}

export interface CreateTechParam {
  title: string;

  postGroup: string;

  contents: string;
}
