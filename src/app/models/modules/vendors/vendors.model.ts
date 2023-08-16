export class FactoryOrder {
    created_at!: any;
    updated_at!: any;
    order_code!: number;
    order_date!: any;
    order_status!: string;
    delivery_date!: any;
    order_total!: number;
    vendor!: {
        id: string;
        data: {
            vendor_code: string;
            vendor_name: string;
        }
    };
}

export class OrderItem {
    created_at!: any;
    updated_at!: any;
    item_number!: number;
    quantity!: number;
    order!: string;
    factory_item!: {
        id: string;
        data: {
            item_code: string;
            item_name: string;
            price: number;
            vat: number;
        }
    };
}
