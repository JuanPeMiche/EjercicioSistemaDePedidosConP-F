import { DataIntegrityFilter } from '../../filters/concreteFilters/dataIntegrityFilter';
import { Order } from '../../models/order';

describe('DataIntegrityFilter', () => {
  const filter = new DataIntegrityFilter();

  it('debe aceptar un pedido con datos completos y válidos', async () => {
    const order: Order = {
      id: 'test1',
      customerId: 'c1',
      items: [{ productId: 'p1', quantity: 1 }],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
  });

  it('debe rechazar pedido sin items', async () => {
    const order: Order = {
      id: 'test2',
      customerId: 'c1',
      items: [],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(false);
    expect(result.errors[0]).toMatch(/al menos un item/);
  });

  it('debe rechazar pedido sin id', async () => {
    const order: any = {
      customerId: 'c1',
      items: [{ productId: 'p1', quantity: 1 }],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(false);
    expect(result.errors[0]).toMatch(/campos obligatorios/);
  });
});
