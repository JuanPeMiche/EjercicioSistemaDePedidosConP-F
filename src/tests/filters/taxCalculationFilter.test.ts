import { TaxCalculationFilter } from '../../filters/concreteFilters/taxCalculationFilter';
import { Order } from '../../models/order';

describe('TaxCalculationFilter', () => {
  const filter = new TaxCalculationFilter();

  it('calcula correctamente los impuestos', async () => {
    const order: Order = {
      id: 'test1',
      customerId: 'c1',
      items: [
        { productId: 'p1', quantity: 1, unitPrice: 1200, totalPrice: 1200 },
        { productId: 'p4', quantity: 2, unitPrice: 20, totalPrice: 40 } // p4 es libro, menor tasa
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
    expect(order.taxes).toBeDefined();
    expect(order.taxes).toBeGreaterThan(0);
  });
});
