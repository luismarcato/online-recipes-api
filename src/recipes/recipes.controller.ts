import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeImageInterceptor } from './interceptors/recipe-image.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RecipeImageInterceptor())
  async create(
    @Body() dto: CreateRecipeDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const recipe = await this.recipesService.create({
      ...dto,
      image: file.filename,
      userId: user.userId,
    });

    return { message: 'Receita criada com sucesso!', recipe };
  }

  @Get()
  findAll(
    @Query('difficulty') difficulty: string = 'ALL',
    @Query('time') time: string = 'ALL',
    @Query('category') category: string = 'ALL',
    @Query('title') title: string = '',
  ) {
    return this.recipesService.findAll({ difficulty, time, category, title });
  }

  @Get('/categories')
  findAllByCategories(
    @Query('difficulty') difficulty: string = 'ALL',
    @Query('time') time: string = 'ALL',
  ) {
    return this.recipesService.findAllByCategories({ difficulty, time });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.remove(id);
  }
}
