import { VolumeDiscountFilter } from '../../filters/concreteFilters/volumeDiscountFilter';
import { Order } from '../../models/order';

describe('VolumeDiscountFilter', () => {
  const filter = new VolumeDiscountFilter();

  it('aplica descuento por volumen correctamente', async () => {
    const order: Order = {
      id: 'test1',
      customerId: 'c1',
      items: Array(11).fill({ productId: 'p1', quantity: 1 }),
      subtotal: 2000,
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
    expect(order.discounts && order.discounts.length).toBeGreaterThan(0);
    expect(order.discounts![0].code).toBe('volume');
  });
});
