export class Item {
    name: string;
    image?: string;
    price: number;

    constructor(item?: Partial<Item>) {
        this.name = item?.name ?? 'item name';
        this.image = item?.image ?? 'image';
        this.price = item?.price ?? 0;
    }
}