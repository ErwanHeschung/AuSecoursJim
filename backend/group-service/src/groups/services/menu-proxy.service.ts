import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConfigService } from "@nestjs/config";
import { DependenciesConfig } from "src/shared/config/interfaces/dependencies-config.interface";
import { AxiosResponse } from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import { firstValueFrom } from "rxjs";
import { MenuItem } from "../schemas/menu-item.schema";
import * as _keyBy from 'lodash/keyBy';
import { MenuItemFullNameNotFoundException } from "../exceptions/menu-item-full-name-not-found.exception copy";

@Injectable()
export class MenuProxyService {
  private _baseUrl: string;
  private _menusPath = '/menus';

  private _menuItemsByFullName: Map<string, MenuItem> = null;

  constructor(private configService: ConfigService, private readonly httpService: HttpService) {
    const dependenciesConfig = this.configService.get<DependenciesConfig>('dependencies');
    this._baseUrl = `http://${dependenciesConfig.menu_service_url_with_port}`;
  }

  private async retrieveAllMenuItems() {
    if (this._menuItemsByFullName === null) {
      const response: AxiosResponse<MenuItem[]> = await firstValueFrom(this.httpService.get(`${this._baseUrl}${this._menusPath}`));
      this._menuItemsByFullName = _keyBy(response.data, 'fullName');
    }
  }


  async getMenuItem(menuItemFullName: string): Promise<MenuItem> {
    await this.retrieveAllMenuItems();
    const menuItem: MenuItem | null = this._menuItemsByFullName[menuItemFullName] || null;

    if (menuItem === null) {
        throw new MenuItemFullNameNotFoundException(menuItemFullName);
    }
    return menuItem;
  }

}