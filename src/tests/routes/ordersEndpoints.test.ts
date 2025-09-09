import request from 'supertest';
import express from 'express';
import pipelineRoutes from '../../routes/pipelineRoutes';
import { errorHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { validatePipelineConfig } from '../../middleware/validatePipelineConfig';

const app = express();
app.use(express.json());
// Middleware de validación para todos los endpoints relevantes
app.use('/api/orders/process', validateRequest);
app.use('/api/orders/:id/status', validateRequest);
app.use('/api/pipeline/config', (req, res, next) => {
  if (req.method === 'PUT') return validatePipelineConfig(req, res, next);
  next();
});
app.use('/api', pipelineRoutes);
app.use(errorHandler);

describe('Endpoints de pedidos', () => {
  it('POST /api/orders/process procesa un pedido válido', async () => {
    const res = await request(app)
      .post('/api/orders/process')
      .send({
        id: 'orderTest1',
        customerId: 'c1',
        items: [{ productId: 'p1', quantity: 1 }],
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.filterResults).toBeDefined();
  });

  it('POST /api/orders/process rechaza pedido inválido', async () => {
    const res = await request(app)
      .post('/api/orders/process')
      .send({
        id: '',
        customerId: '',
        items: [],
        status: 'pending',
        createdAt: ''
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('GET /api/orders/:id/status devuelve 404 si no existe', async () => {
    const res = await request(app).get('/api/orders/noexiste/status');
    expect(res.status).toBe(404);
  });

  it('PUT /api/pipeline/config rechaza config inválida', async () => {
    const res = await request(app)
      .put('/api/pipeline/config')
      .send({ enabledFilters: 'noArray' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
