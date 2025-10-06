import { Injectable } from '@nestjs/common';
import { MenuService } from 'src/modules/back-proxy/menu/menu.service';
import { ItemDto } from 'src/common/dto/item.dto';
import { CategoryDto } from 'src/common/dto/category.dto';
import { IngredientService } from 'src/modules/data-provider/ingredient/ingredient.service';

@Injectable()
export class CategoryService {
  constructor(private readonly menuService: MenuService,
    private readonly ingredientService:IngredientService) { }

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

    const filteredMenus = menus.filter(menu => menu.category === category);

    return Promise.all(
      filteredMenus.map(async menu => ({
        ...menu,
        ingredients: await this.ingredientService.getIngredientsForItem(menu._id),
      })),
    );
  }

}
