import { Order } from '../models/order';
import { FilterResult } from './filterResult';

export interface ProcessingContext {
    // Puedes agregar propiedades según lo que necesite cada filtro (por ejemplo, logs, config, etc.)
    [key: string]: any;
}

export interface OrderFilter {
    name: string;
    process(order: Order, context: ProcessingContext): Promise<FilterResult>;
}