import { PaymentProcessingFilter } from '../../filters/concreteFilters/paymentProcessingFilter';
import { Order } from '../../models/order';

describe('PaymentProcessingFilter', () => {
  const filter = new PaymentProcessingFilter();

  it('marca el pedido como completado y agrega confirmationCode si el pago es exitoso', async () => {
    // Forzar éxito
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    const order: Order = {
      id: 'pay1',
      customerId: 'c1',
      items: [{ productId: 'p1', quantity: 1 }],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(true);
    expect(order.status).toBe('completed');
    expect(order.metadata?.confirmationCode).toBeDefined();
    (Math.random as jest.MockedFunction<typeof Math.random>).mockRestore();
  });

  it('marca el pedido como rechazado si el pago falla', async () => {
    // Forzar fallo
    jest.spyOn(Math, 'random').mockReturnValue(0.05);
    const order: Order = {
      id: 'pay2',
      customerId: 'c1',
      items: [{ productId: 'p1', quantity: 1 }],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await filter.process(order, {});
    expect(result.success).toBe(false);
    expect(order.status).toBe('rejected');
    expect(result.errors[0]).toMatch(/pago/);
    (Math.random as jest.MockedFunction<typeof Math.random>).mockRestore();
  });
});
