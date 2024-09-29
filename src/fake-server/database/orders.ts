import { IOrderDef } from '~/fake-server/interfaces/order-def';
import { IOrder, IOrderTotal } from '~/interfaces/order';
import { products } from '~/fake-server/database/products';
import { addresses } from '~/fake-server/database/addresses';
import { makeIdGenerator } from '~/fake-server/utils';
import axios from 'axios';

export const getNextOrderId = makeIdGenerator();
let ordersDef: IOrderDef[] = []
// Function to fetch products from API
async function fetchAndStoreProducts() {
    try {
        const response = await axios.get('http://localhost:5000/api/orders/front');
        ordersDef = response.data.data || [];
        console.log(ordersDef);
    } catch (error) {
        ordersDef = []; // Reset to an empty array on error
    }
}

// Call fetch function and wait for it to complete
await fetchAndStoreProducts();

export function getOrderToken(orderId: number): string {
    const token = 'b84486c31644eac99f6909a6e8c19109';

    return token.slice(0, token.length - orderId.toString().length) + orderId.toString();
}
function generateNumericId(): string {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}
function makeOrders(defs: IOrderDef[]): IOrder[] {
    return defs.map((def) => {
        const id = getNextOrderId();
        const items = def.items.map((orderItemDef) => {
            const product = products.find((x) => x.slug === orderItemDef.product);

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                product: JSON.parse(JSON.stringify(product)),
                options: orderItemDef.options,
                price: product.price,
                quantity: orderItemDef.quantity,
                total: product.price * orderItemDef.quantity,
            };
        });

        const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = items.reduce((acc, item) => acc + item.total, 0);

        const totals: IOrderTotal[] = [
            { title: 'SHIPPING', price: 25 },
            { title: 'TAX', price: Math.round(subtotal * 0.2) },
        ];

        const total = subtotal + totals.reduce((acc, x) => acc + x.price, 0);

        return {
            id,
            token: getOrderToken(id),
            number: def.number,
            createdAt: def.createdAt,
            payment: def.payment,
            status: def.status,
            items,
            quantity,
            subtotal,
            totals,
            total,
            shippingAddress: JSON.parse(JSON.stringify(addresses[0])),
            billingAddress: JSON.parse(JSON.stringify(addresses[0])),
        };
    });
}



export const orders: IOrder[] = makeOrders(ordersDef);

export function getNextOrderNumber(): string {
    return generateNumericId();
}
