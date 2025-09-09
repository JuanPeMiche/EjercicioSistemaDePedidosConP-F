import { Order } from '../models/order';

export interface FilterResult {
    success: boolean;
    order: Order;
    errors: string[];
    warnings: string[];
}
