import request from 'supertest';
import express from 'express';
import * as pipelineController from '../../controllers/pipelineController';

const app = express();
app.use(express.json());
app.get('/api/pipeline/config', pipelineController.getPipelineConfig);
app.put('/api/pipeline/config', pipelineController.updatePipelineConfig);

describe('pipelineController', () => {
  it('should get the current pipeline config', async () => {
    const res = await request(app).get('/api/pipeline/config');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('enabledFilters');
    expect(Array.isArray(res.body.enabledFilters)).toBe(true);
  });

  it('should update the pipeline config', async () => {
    const newConfig = { enabledFilters: ['CustomerValidationFilter'] };
    const res = await request(app).put('/api/pipeline/config').send(newConfig);
    expect(res.status).toBe(200);
    expect(res.body.enabledFilters).toContain('CustomerValidationFilter');
  });
});
