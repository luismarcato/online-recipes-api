import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRecipeDto & { image: string; userId: number }) {
    return this.prisma.recipe.create({
      data,
    });
  }

  async findAll(filters: {
    difficulty: string;
    time: string;
    category: string;
    title: string;
  }) {
    const where: any = {};

    if (filters.category !== 'ALL') {
      where.category = filters.category;
    }

    if (filters.difficulty !== 'ALL') {
      where.difficulty = filters.difficulty;
    }

    if (filters.title !== '') {
      where.title = {
        contains: filters.title,
        mode: 'insensitive',
      };
    }

    switch (filters.time) {
      case 'UNDER_30':
        where.time = {
          lt: 30,
        };
        break;
      case 'OVER_60':
        where.time = {
          gt: 60,
        };
        break;
      case 'BETWEEN_30_AND_60':
        where.time = {
          gte: 30,
          lte: 60,
        };
        break;
      default:
        break;
    }

    return this.prisma.recipe.findMany({
      where,
      select: {
        id: true,
        image: true,
        title: true,
        time: true,
        difficulty: true,
        category: true,
      },
    });
  }

  async findAllByCategories(filters: { difficulty: string; time: string }) {
    const where: any = {};

    if (filters.difficulty !== 'ALL') {
      where.difficulty = filters.difficulty;
    }

    switch (filters.time) {
      case 'UNDER_30':
        where.time = {
          lt: 30,
        };
        break;
      case 'OVER_60':
        where.time = {
          gt: 60,
        };
        break;
      case 'BETWEEN_30_AND_60':
        where.time = {
          gte: 30,
          lte: 60,
        };
        break;
      default:
        break;
    }

    const countCategory = await this.prisma.recipe.groupBy({
      by: ['category'],
      where,
      _count: {
        id: true,
      },
    });

    const mappedCategories = Object.fromEntries(
      countCategory.map((item) => [item.category, item._count.id]),
    );

    return mappedCategories;
  }

  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });
    if (!recipe) throw new NotFoundException(`Receita ${id} não encontrada`);
    return recipe;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.recipe.delete({ where: { id } });
  }
}
