import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ItemDto } from '../../common/dto/item.dto';

@Injectable()
export class MenuService {
  private backendUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.backendUrl = this.config.get<string>('GATEWAY_URL_WITH_PORT') ?? '';
    this.backendUrl += '/menu';
  }

  async getAllMenus(): Promise<ItemDto[]> {
    const { data } = await this.http.axiosRef.get(`${this.backendUrl}/menus`);

    return data.map((menu: any) => ({
      _id: menu._id, 
      fullName: menu.fullName,
      shortName: menu.shortName,
      price: menu.price,
      category: menu.category,
      image: menu.image,
      ingredients: menu.ingredients,
    }));
  }
}
