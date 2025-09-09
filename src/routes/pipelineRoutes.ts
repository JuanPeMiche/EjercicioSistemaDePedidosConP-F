import { Router } from 'express';
import { processOrder, getOrderStatus } from '../controllers/orderController';
import { getPipelineConfig, updatePipelineConfig } from '../controllers/pipelineController';
import { validateRequest } from '../middleware/validateRequest';
import { validatePipelineConfig } from '../middleware/validatePipelineConfig';

const router = Router();

// Procesar pedido completo a través del pipeline maestro
router.post('/orders/process', validateRequest, processOrder);

// Estado del procesamiento y resultado de cada filtro
router.get('/orders/:id/status', validateRequest, getOrderStatus);

// Ver configuración actual del pipeline
router.get('/pipeline/config', getPipelineConfig);

// Modificar configuración de filtros (habilitar/deshabilitar)
router.put('/pipeline/config', validatePipelineConfig, updatePipelineConfig);

export default router;
