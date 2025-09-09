import { OrderFilter } from '../orderFilter';
import { Order } from '../../models/order';
import { FilterResult } from '../filterResult';
import { ProcessingContext } from '../orderFilter';

export class PaymentProcessingFilter implements OrderFilter {
    name = 'PaymentProcessingFilter';

    async process(order: Order, context: ProcessingContext): Promise<FilterResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        // Simulación: 90% éxito, 10% falla
        const paymentSuccess = Math.random() > 0.1;
        if (paymentSuccess) {
            order.status = 'completed';
            order.metadata = order.metadata || {};
            order.metadata.confirmationCode = 'CONF-' + Math.random().toString(36).substring(2, 10).toUpperCase();
        } else {
            order.status = 'rejected';
            errors.push('Error en el procesamiento de pago.');
        }
        return {
            success: errors.length === 0,
            order,
            errors,
            warnings,
        };
    }
}
