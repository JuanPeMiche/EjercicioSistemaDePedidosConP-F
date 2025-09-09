import { Order } from '../models/order';

export const orders: Order[] = [
  {
    id: 'o1',
    customerId: 'c1',
    items: [
      { productId: 'p1', quantity: 1 },
      { productId: 'p2', quantity: 2 }
    ],
    status: 'pending',
    createdAt: new Date('2025-09-01T10:00:00Z')
  },
  {
    id: 'o2',
    customerId: 'c2',
    items: [
      { productId: 'p3', quantity: 1 }
    ],
    status: 'pending',
    createdAt: new Date('2025-09-02T12:00:00Z')
  },
  {
    id: 'o3',
    customerId: 'c3',
    items: [
      { productId: 'p4', quantity: 3 }
    ],
    status: 'pending',
    createdAt: new Date('2025-09-03T15:00:00Z')
  }
];
