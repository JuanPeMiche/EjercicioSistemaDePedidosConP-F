import { orderPipeline } from '../../services/orderPipelineServices';
import { Order } from '../../models/order';

describe('OrderPipeline integración', () => {
  it('debe procesar un pedido válido y pasar todos los filtros', async () => {
    const order: Order = {
      id: 'pipetest1',
      customerId: 'c1',
      items: [
        { productId: 'p1', quantity: 1 },
        { productId: 'p2', quantity: 2 }
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const config = { enabledFilters: orderPipeline.filters.map(f => f.name) };
    const result = await orderPipeline.process(order, config);
    expect(result.success).toBe(true);
    expect(result.filterResults.every(r => r.success)).toBe(true);
  });

  it('debe fallar si un filtro de validación falla', async () => {
    const order: Order = {
      id: 'pipetest2',
      customerId: 'noexiste',
      items: [
        { productId: 'p1', quantity: 1 }
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const config = { enabledFilters: orderPipeline.filters.map(f => f.name) };
    const result = await orderPipeline.process(order, config);
    expect(result.success).toBe(false);
    expect(result.failedAt).toBe('CustomerValidationFilter');
  });
});
