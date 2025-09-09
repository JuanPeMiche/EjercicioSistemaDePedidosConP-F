import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';
import { products } from '../../data/products';

export class TaxCalculationFilter implements OrderFilter {
    name = 'TaxCalculationFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        let taxes = 0;
        const errors: string[] = [];
        const warnings: string[] = [];
        for (const item of order.items) {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                let taxRate = 0.21; // Default 21%
                if (product.category === 'books') taxRate = 0.10;
                // Aquí podrías agregar lógica para tasas regionales
                if (item.totalPrice) taxes += item.totalPrice * taxRate;
            } else {
                errors.push(`Producto con id ${item.productId} no encontrado para cálculo de impuestos.`);
            }
        }
        order.taxes = taxes;
        return {
            success: errors.length === 0,
            order,
            errors,
            warnings,
        };
    }
}
