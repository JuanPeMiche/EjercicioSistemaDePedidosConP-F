import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';
import { customers } from '../../data/customers';

export class MembershipDiscountFilter implements OrderFilter {
    name = 'MembershipDiscountFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        const customer = customers.find(c => c.id === order.customerId);
        if (!customer) {
            errors.push('Cliente no encontrado para aplicar descuento de membresía.');
        } else {
            let discountRate = 0;
            switch (customer.membership) {
                case 'bronze': discountRate = 0.05; break;
                case 'silver': discountRate = 0.10; break;
                case 'gold': discountRate = 0.15; break;
                case 'platinum': discountRate = 0.20; break;
            }
            if (discountRate > 0 && order.subtotal) {
                const discount = { code: 'membership', type: 'membership', amount: order.subtotal * discountRate };
                order.discounts = order.discounts || [];
                order.discounts.push(discount);
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
