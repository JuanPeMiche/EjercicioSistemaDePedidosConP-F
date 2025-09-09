import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';
import { customers } from '../../data/customers';

export class CustomerValidationFilter implements OrderFilter {
    name = 'CustomerValidationFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        const customer = customers.find(c => c.id === order.customerId);

        if (!customer) {
            errors.push('El cliente no existe.');
        } else {
            if (!customer.isActive) {
                errors.push('El cliente no está activo.');
            }
            if (!customer.email || !customer.name) {
                errors.push('Información de contacto incompleta.');
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
