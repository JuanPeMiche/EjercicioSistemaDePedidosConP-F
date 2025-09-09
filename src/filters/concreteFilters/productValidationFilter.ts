import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';
import { products } from '../../data/products';

export class ProductValidationFilter implements OrderFilter {
    name = 'ProductValidationFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        for (const item of order.items) {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                errors.push(`Producto con id ${item.productId} no existe.`);
            } else {
                if (item.quantity > product.stock) {
                    errors.push(`No hay stock suficiente para el producto ${product.name}.`);
                }
                if (item.quantity <= 0) {
                    errors.push(`Cantidad inválida para el producto ${product.name}.`);
                }
            }
        }
        return {
            success: errors.length === 0,
            order,
            errors,
            warnings,
        };
    }
}
