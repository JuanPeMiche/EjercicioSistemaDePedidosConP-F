import { orderPipeline } from '../../services/orderPipelineServices';
import { Order } from '../../models/order';
import { PipelineConfig } from '../../pipelines/orderPipeline';

describe('orderPipelineServices', () => {
  it('should process an order with all filters enabled and return a PipelineResult', async () => {
    const order: Order = {
      id: 'test-1',
      customerId: 'CUST001',
      items: [
        { productId: 'PROD001', quantity: 2 },
        { productId: 'PROD002', quantity: 1 }
      ],
      status: 'pending',
  createdAt: new Date()
    };
    const config: PipelineConfig = { enabledFilters: orderPipeline.filters.map(f => f.name) };
    const result = await orderPipeline.process(order, config);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('finalOrder');
    expect(result).toHaveProperty('filterResults');
    expect(Array.isArray(result.filterResults)).toBe(true);
    expect(result).toHaveProperty('executionTime');
  });

  it('should fail if a required filter fails (e.g., invalid customer)', async () => {
    const order: Order = {
      id: 'test-2',
      customerId: 'INVALID',
      items: [
        { productId: 'PROD001', quantity: 2 }
      ],
      status: 'pending',
  createdAt: new Date()
    };
    const config: PipelineConfig = { enabledFilters: orderPipeline.filters.map(f => f.name) };
    const result = await orderPipeline.process(order, config);
    expect(result.success).toBe(false);
    expect(result.failedAt).toBeDefined();
    expect(result.filterResults.some(fr => fr.success === false)).toBe(true);
  });

  it('should allow disabling filters via config', async () => {
    const order: Order = {
      id: 'test-3',
      customerId: 'CUST001',
      items: [
        { productId: 'PROD001', quantity: 2 }
      ],
      status: 'pending',
  createdAt: new Date()
    };
    // Disable all filters
    const config: PipelineConfig = { enabledFilters: [] };
    const result = await orderPipeline.process(order, config);
    expect(result.success).toBe(true);
    expect(result.filterResults.length).toBe(0);
  });
});
