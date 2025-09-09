import { CustomerValidationFilter } from '../../filters/concreteFilters/customerValidationFilter';
import { Order } from '../../models/order';
import { customers } from '../../data/customers';

describe('CustomerValidationFilter', () => {
  const filter = new CustomerValidationFilter();

  it('debe aceptar un cliente válido y activo', async () => {
    const order: Order = {
      id: 'test1',
      customerId: customers[0].id,
      items: [{ productId: 'p1', quantity: 1 }],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('debe rechazar un cliente inexistente', async () => {
    const order: Order = {
      id: 'test2',
      customerId: 'noexiste',
      items: [{ productId: 'p1', quantity: 1 }],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(false);
    expect(result.errors).toContain('El cliente no existe.');
  });

  it('debe rechazar un cliente inactivo', async () => {
    const order: Order = {
      id: 'test3',
      customerId: customers.find(c => !c.isActive)?.id || '',
      items: [{ productId: 'p1', quantity: 1 }],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(false);
    expect(result.errors).toContain('El cliente no está activo.');
  });
});
