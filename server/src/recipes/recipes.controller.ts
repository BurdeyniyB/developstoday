import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getAll(@Query('filter') filter?: string, @Query('value') value?: string) {
    return this.recipesService.getRecipes(filter, value);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.recipesService.getRecipes('search', query);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.recipesService.getRecipeDetails(id);
  }
}
