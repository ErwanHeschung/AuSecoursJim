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
    console.log(this.config.get<string>('GATEWAY_URL_WITH_PORT'));
    this.backendUrl = this.config.get<string>('GATEWAY_URL_WITH_PORT') ?? '';
    this.backendUrl += '/menu';
    console.log(this.backendUrl);

  }

  async getAllMenus(): Promise<ItemDto[]> {
    console.log(this.backendUrl);
    const { data } = await this.http.axiosRef.get(`${this.backendUrl}/menus`);

    return data.map((menu: any) => ({
      _id: menu.id,
      fullName: menu.fullName,
      shortName: menu.shortName,
      price: menu.price,
      category: menu.category,
      image: menu.image,
      ingredients: menu.ingredients,
    }));
  }
}
