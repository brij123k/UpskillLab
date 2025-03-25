import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateStoryDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;
}