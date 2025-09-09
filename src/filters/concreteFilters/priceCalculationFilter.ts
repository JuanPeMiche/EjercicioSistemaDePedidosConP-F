import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';
import { products } from '../../data/products';

export class PriceCalculationFilter implements OrderFilter {
    name = 'PriceCalculationFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        let subtotal = 0;
        const errors: string[] = [];
        const warnings: string[] = [];
        for (const item of order.items) {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                item.unitPrice = product.price;
                item.totalPrice = product.price * item.quantity;
                subtotal += item.totalPrice;
            } else {
                errors.push(`Producto con id ${item.productId} no encontrado para cálculo de precio.`);
            }
        }
        order.subtotal = subtotal;
        return {
            success: errors.length === 0,
            order,
            errors,
            warnings,
        };
    }
}
