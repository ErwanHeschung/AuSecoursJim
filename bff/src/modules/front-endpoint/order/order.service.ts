import { Injectable, Logger } from '@nestjs/common';
import { BasketDto } from 'src/common/dto/basket.dto';
import { OrderItemDto } from 'src/common/dto/item.dto';
import { TableProxy } from 'src/modules/back-proxy/table.proxy';

@Injectable()
export class OrderService {

  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly tableProxy: TableProxy
  ) {}


  async prepareOrderOnFirstFreeOrderNumber(basket: BasketDto): Promise<{ orderId: string }> {

    // getFirstFreeOrderNumber
    const tables = await this.tableProxy.getTables();
    const freeTable = tables.find(t => !t.taken);

    if (!freeTable) {
      this.logger.error('No free table available');
      throw new Error('No free table available');
    }

    // prepareOrder
    const orderId = await this.tableProxy.openOrder(freeTable.number);

    for (const item of basket.items) {
      const orderItem: OrderItemDto = {
        menuItemId: item._id,
        menuItemShortName: item.shortName,
        howMany: Number(item.quantity),
      };
      await this.tableProxy.addMenuToOrder(orderId, orderItem);
    }

    await this.tableProxy.prepareOrder(orderId);

    return { orderId };
  }


  async finishOrder(orderId: string): Promise<void> {
    await this.tableProxy.finishOrder(orderId);
  }

}