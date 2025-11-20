import { Type } from 'class-transformer';
import { IsString, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @Type(() => Number)
  @IsInt()
  time: number;

  @IsString()
  difficulty: string;

  @IsString()
  category: string;

  @Type(() => Number)
  @IsInt()
  servings: number;

  @IsString()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  instructions: string[];
}
