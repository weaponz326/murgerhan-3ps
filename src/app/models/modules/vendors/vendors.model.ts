export class Order {
    created_at!: any;
    updated_at!: any;
    order_code!: number;
    order_date!: any;
    order_status!: string;
    delivery_date!: any;
    total_price!: number;
    vendor!: {
        id: string;
        data: {
            vendor_code: string;
            vendor_name: string;
        }
    };
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class OrderItem {
    created_at!: any;
    updated_at!: any;
    item_number!: number;
    quantity!: number;
    order!: string;
    product!: {
        id: string;
        data: {
            product_code: string;
            product_name: string;
            price: number;
        }
    };
}
