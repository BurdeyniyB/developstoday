import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RecipesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}


  async getRecipes(filter?: string, value?: string) {
    const baseUrl = this.configService.get<string>('BASE_URL', 'https://www.themealdb.com/api/json/v1/1');
    let url: string;

    if (!filter || !value) {
      url = `${baseUrl}/search.php?s=`;
    } else if (filter === 'ingredient') {
      url = `${baseUrl}/filter.php?i=${value}`;
    } else if (filter === 'country') {
      url = `${baseUrl}/filter.php?a=${value}`;
    } else if (filter === 'category') {
      url = `${baseUrl}/filter.php?c=${value}`;
    } else if (filter === 'search') {
      url = `${baseUrl}/search.php?s=${value}`;
    } else {
      url = `${baseUrl}/search.php?s=`;
    }

    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getRecipeDetails(id: string) {
    const baseUrl = this.configService.get<string>('BASE_URL', 'https://www.themealdb.com/api/json/v1/1');
    const url = `${baseUrl}/lookup.php?i=${id}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
