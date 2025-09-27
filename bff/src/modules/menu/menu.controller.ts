import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { ItemDto } from '../../common/dto/item.dto';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('menus')
  @ApiOkResponse({ type: [ItemDto] })
  getAllMenus(): Promise<ItemDto[]> {
    return this.menuService.getAllMenus();
  }
}
