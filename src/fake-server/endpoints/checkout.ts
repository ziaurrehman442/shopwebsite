import axios from 'axios';
import { delayResponse } from '~/fake-server/utils';
import { ICheckoutData } from '~/api/base';
import { IOrder, IOrderItem, IOrderTotal } from '~/interfaces/order';
import { products } from '~/fake-server/database/products';
import {
    getNextOrderId,
    getNextOrderNumber,
    getOrderToken,
    orders,
} from '~/fake-server/database/orders';

// Backend API URL for order submission
const BACKEND_API_URL = 'http://localhost:5000/api/orders'; // Replace with your actual backend URL

export function checkout(data: ICheckoutData): Promise<IOrder> {
    const id = getNextOrderId();
    const items: IOrderItem[] = data.items.map((x) => {
        const product = products.find((p) => p.id === x.productId);

        if (!product) {
            throw new Error('Product not found');
        }

        return {
            product,
            options: x.options,
            price: product.price,
            quantity: x.quantity,
            total: product.price * x.quantity,
        };
    });
    const quantity = items.reduce((acc, x) => acc + x.quantity, 0);
    const subtotal = items.reduce((acc, x) => acc + x.total, 0);
    const totals: IOrderTotal[] = [
        {
            title: 'SHIPPING',
            price: 25,
        },
        {
            title: 'TAX',
            price: subtotal * 0.20,
        },
    ];
    const total = subtotal + totals.reduce((acc, x) => acc + x.price, 0);

    const date = new Date();
    const pad = (v: number) => (`00${v}`).substr(-2);
    const createdAt = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    const order: IOrder = {
        id,
        token: getOrderToken(id),
        number: getNextOrderNumber(),
        createdAt,
        payment: data.payment,
        status: 'PENDING',
        items,
        quantity,
        subtotal,
        totals,
        total,
        billingAddress: data.billingAddress,
        shippingAddress: data.shippingAddress,
    };

    // Add the order to the local orders list
    orders.unshift(order);

    console.log(orders); // For debugging

    // Send the order data to the backend after it is unshifted to orders
    const email = localStorage.getItem('email'); // Get the email from localStorage

    if (!email) {
        throw new Error('User is not authenticated.');
    }
    axios.post(
        BACKEND_API_URL,
        order, // Send the created order object to the backend
        {
            headers: {
                Authorization: `${email}`, // Send the email as a token in the Authorization header
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        }
    )
    .then((response) => {
        console.log('Order successfully sent to the backend:', response.data);
        return delayResponse(Promise.resolve(order)); // Return the order on success
    })
    .catch((error) => {
        console.error('Failed to send order to the backend:', error);
        throw error;
    });
    // Make the API request to the backend to store the order
    return delayResponse(Promise.resolve(order));
}

