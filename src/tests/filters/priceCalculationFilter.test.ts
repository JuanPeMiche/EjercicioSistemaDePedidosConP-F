import { PriceCalculationFilter } from '../../filters/concreteFilters/priceCalculationFilter';
import { Order } from '../../models/order';

describe('PriceCalculationFilter', () => {
  const filter = new PriceCalculationFilter();

  it('calcula correctamente el subtotal y los precios de los items', async () => {
    const order: Order = {
      id: 'test1',
      customerId: 'c1',
      items: [
        { productId: 'p1', quantity: 2 },
        { productId: 'p2', quantity: 1 }
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
    expect(order.subtotal).toBeDefined();
    expect(order.items[0].unitPrice).toBeDefined();
    expect(order.items[0].totalPrice).toBeDefined();
  });
});
