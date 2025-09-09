import { OrderItem } from './orderItem';

export interface Discount {
    code: string;
    amount: number;
    description?: string;
}

export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    subtotal?: number;
    discounts?: Discount[];
    taxes?: number;
    shipping?: number;
    total?: number;
    status: 'pending' | 'processing' | 'completed' | 'rejected';
    metadata?: Record<string, any>;
    createdAt: Date;
}