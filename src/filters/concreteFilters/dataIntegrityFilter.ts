import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';

export class DataIntegrityFilter implements OrderFilter {
    name = 'DataIntegrityFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        if (!order.id || !order.customerId || !order.items || !order.createdAt) {
            errors.push('Faltan campos obligatorios en el pedido.');
        }
        if (!Array.isArray(order.items) || order.items.length === 0) {
            errors.push('El pedido debe tener al menos un item.');
        }
        for (const item of order.items) {
            if (!item.productId || typeof item.quantity !== 'number') {
                errors.push('Faltan campos obligatorios en un item del pedido.');
            }
            if (item.quantity <= 0) {
                errors.push('La cantidad de un item debe ser mayor a cero.');
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
