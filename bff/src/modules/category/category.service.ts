import { Injectable } from '@nestjs/common';
import { MenuService } from '../menu/menu.service';
import { ItemDto } from '../../common/dto/item.dto';
import { CategoryDto } from '../../common/dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly menuService: MenuService) {}

  async getAllCategories(): Promise<CategoryDto[]> {
    const menus: ItemDto[] = await this.menuService.getAllMenus();

    const categoriesMap = new Map<string, string>();
    menus.forEach(menu => {
      if (!categoriesMap.has(menu.category)) {
        categoriesMap.set(menu.category, menu.image);
      }
    });

    return Array.from(categoriesMap.entries()).map(([category, image]) => ({
      name: category,
      image,
    }));
  }

  async getItemsByCategoryName(category: string): Promise<ItemDto[]> {
    const menus: ItemDto[] = await this.menuService.getAllMenus();
    return menus.filter(menu => menu.category === category);
  }
}
