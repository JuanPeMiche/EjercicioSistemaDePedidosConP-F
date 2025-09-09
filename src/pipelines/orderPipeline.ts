import { Order } from '../models/order';
import { OrderFilter } from '../filters/orderFilter';
import { PipelineResult } from './pipelineResult';

export interface PipelineConfig {
    // Configuración de filtros habilitados/deshabilitados, reglas, etc.
    enabledFilters: string[];
    [key: string]: any;
}

export interface OrderPipeline {
// Implementación básica de OrderPipeline
    filters: OrderFilter[];
    addFilter(filter: OrderFilter): void;
    removeFilter(filterName: string): void;
    process(order: Order, config: PipelineConfig): Promise<PipelineResult>;
}