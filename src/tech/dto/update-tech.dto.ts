import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTechDto {
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

export interface UpdateTechParam {
  title: string;

  postGroup: string;

  contents: string;
}
