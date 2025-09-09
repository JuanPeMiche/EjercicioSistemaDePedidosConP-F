import express from 'express';
import pipelineRoutes from './routes/pipelineRoutes';
import { validateRequest } from './middleware/validateRequest';
import { validatePipelineConfig } from './middleware/validatePipelineConfig';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sistema de Pedidos con Pipes & Filters listo!');
});

// Rutas del sistema de pipelines
// Validación de requests para todos los endpoints relevantes
app.use('/api/orders/process', validateRequest);
app.use('/api/orders/:id/status', validateRequest);
app.use('/api/pipeline/config', (req, res, next) => {
  if (req.method === 'PUT') {
    return validatePipelineConfig(req, res, next);
  }
  next();
});

app.use('/api', pipelineRoutes);

// Middleware de manejo de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
