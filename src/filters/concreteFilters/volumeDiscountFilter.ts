import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';

export class VolumeDiscountFilter implements OrderFilter {
    name = 'VolumeDiscountFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        let totalItems = 0;
        if (order.items) {
            totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
        }
        let volumeDiscount = 0;
        if (totalItems > 50) {
            volumeDiscount += 0.10;
        } else if (totalItems > 10) {
            volumeDiscount += 0.05;
        }
        if (order.subtotal) {
            if (order.subtotal > 5000) {
                volumeDiscount += 0.10;
            } else if (order.subtotal > 1000) {
                volumeDiscount += 0.05;
            }
        }
        if (volumeDiscount > 0 && order.subtotal) {
            const discount = { code: 'volume', type: 'volume', amount: order.subtotal * volumeDiscount };
            order.discounts = order.discounts || [];
            order.discounts.push(discount);
        }
        return {
            success: errors.length === 0,
            order,
            errors,
            warnings,
        };
    }
}
