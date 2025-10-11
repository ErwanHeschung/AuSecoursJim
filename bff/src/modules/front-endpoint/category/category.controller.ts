import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/common/dto/category.dto';
import { ItemDto } from 'src/common/dto/item.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({ type: [CategoryDto] })
  async getAllCategories(): Promise<CategoryDto[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':name/items')
  @ApiOkResponse({ type: [ItemDto] })
  async getItemsByCategoryName(@Param('name') name: string): Promise<ItemDto[]> {
    return this.categoryService.getItemsByCategoryName(name);
  }
}