import { OrderStatus } from "./order-status.model";
import { OrderType } from "./order-type.model";
import { PaymentMethod } from "./payment-method.model";
import { Item } from "./item.model";

export type Order = {
    id: number;
    status: OrderStatus;
    type: OrderType;
    payment: PaymentMethod;
    amount: number;
    amountSplits: number[];
    quantity: number;
    items: Item[];
};