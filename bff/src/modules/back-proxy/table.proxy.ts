import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OrderItemDto } from "src/common/dto/item.dto";
import { OrderDto } from "src/common/dto/order.dto";
import { TableDto } from "src/common/dto/table.dto";

@Injectable()
export class TableProxy {
    
    private backendUrl: string;

    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {
        this.backendUrl = this.config.get<string>('GATEWAY_URL_WITH_PORT') ?? '';
        this.backendUrl += '/dining';
    }


    public async getTables(): Promise<TableDto[]> {
        const { data } = await this.http.axiosRef.get<TableDto[]>(`${this.backendUrl}/tables`);
        return data;
    }

    public async addTable(tableNumber: number): Promise<TableDto> {
        const { data } = await this.http.axiosRef.post<TableDto>(`${this.backendUrl}/tables`, { number: tableNumber });
        return data;
    }


    public async getOrder(orderId: string): Promise<OrderDto> {
        const { data } = await this.http.axiosRef.get<OrderDto>(`${this.backendUrl}/tableOrders/${orderId}`);
        return data;
    }

    public async openOrder(tableNumber: number): Promise<string> {
        const { data } = await this.http.axiosRef.post<{ _id: string }>(`${this.backendUrl}/tableOrders`, { tableNumber, customersCount: 1 });
        return data._id;
    }

    public async addMenuToOrder(orderId: string, item: OrderItemDto): Promise<void> {
        await this.http.axiosRef.post<void>(`${this.backendUrl}/tableOrders/${orderId}`, item);
    }

    public async prepareOrder(orderId: string): Promise<void> {
        await this.http.axiosRef.post<void>(`${this.backendUrl}/tableOrders/${orderId}/prepare`, {});
    }

    public async finishOrder(orderId: string): Promise<void> {
        await this.http.axiosRef.post<void>(`${this.backendUrl}/tableOrders/${orderId}/bill`, {});
    }

}
