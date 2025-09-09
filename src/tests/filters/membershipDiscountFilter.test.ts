import { MembershipDiscountFilter } from '../../filters/concreteFilters/membershipDiscountFilter';
import { Order } from '../../models/order';

describe('MembershipDiscountFilter', () => {
  const filter = new MembershipDiscountFilter();

  it('aplica descuento de membresía correctamente', async () => {
    const order: Order = {
      id: 'test1',
      customerId: 'c1',
      items: [{ productId: 'p1', quantity: 1 }],
      subtotal: 1000,
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
    expect(order.discounts && order.discounts.length).toBeGreaterThan(0);
    expect(order.discounts![0].code).toBe('membership');
  });
});
