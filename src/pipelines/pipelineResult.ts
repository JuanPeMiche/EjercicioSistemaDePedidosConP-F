import { Order } from '../models/order';
import { FilterResult } from '../filters/filterResult';

export interface PipelineResult {
    success: boolean;
    finalOrder: Order;
    filterResults: FilterResult[];
    executionTime: number;
    failedAt?: string;
}
