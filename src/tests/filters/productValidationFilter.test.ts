import { ProductValidationFilter } from '../../filters/concreteFilters/productValidationFilter';
import { Order } from '../../models/order';

describe('ProductValidationFilter', () => {
  const filter = new ProductValidationFilter();

  it('debe aceptar productos válidos y stock suficiente', async () => {
    const order: Order = {
      id: 'test1',
      customerId: 'c1',
      items: [
        { productId: 'p1', quantity: 1 },
        { productId: 'p2', quantity: 2 }
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
  });

  it('debe rechazar producto inexistente', async () => {
    const order: Order = {
      id: 'test2',
      customerId: 'c1',
      items: [
        { productId: 'noexiste', quantity: 1 }
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(false);
    expect(result.errors[0]).toMatch(/no existe/);
  });

  it('debe rechazar cantidad mayor al stock', async () => {
    const order: Order = {
      id: 'test3',
      customerId: 'c1',
      items: [
        { productId: 'p1', quantity: 999 }
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(false);
    expect(result.errors[0]).toMatch(/stock suficiente/);
  });
});
