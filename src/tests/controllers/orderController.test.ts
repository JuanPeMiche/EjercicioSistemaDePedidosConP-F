import request from 'supertest';
import express from 'express';
import * as orderController from '../../controllers/orderController';

const app = express();
app.use(express.json());
app.post('/api/orders', orderController.processOrder);
app.get('/api/orders/:id', orderController.getOrderStatus);

describe('orderController', () => {
  it('should process a valid order and return PipelineResult', async () => {
    const order = {
      id: 'test-ctrl-1',
      customerId: 'CUST001',
      items: [
        { productId: 'PROD001', quantity: 1 }
      ],
      payment: { method: 'credit_card', amount: 0 },
      status: 'pending',
      createdAt: new Date(),
    };
    const res = await request(app).post('/api/orders').send(order);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('finalOrder');
    expect(res.body).toHaveProperty('filterResults');
  });

  it('should return 404 for unknown order status', async () => {
    const res = await request(app).get('/api/orders/unknown-id');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Order not found');
  });
});
