import { Request, Response } from 'express';
import { orderPipeline } from '../services/orderPipelineServices';
import { PipelineConfig } from '../pipelines/orderPipeline';
import { PipelineResult } from '../pipelines/pipelineResult';
import { Order } from '../models/order';

// Almacén en memoria para resultados de procesamiento
const orderResults: Record<string, PipelineResult> = {};

export const processOrder = async (req: Request, res: Response) => {
    const order: Order = req.body;
    // Configuración por defecto, puedes mejorar esto
    const config: PipelineConfig = { enabledFilters: orderPipeline.filters.map(f => f.name) };
    const result = await orderPipeline.process(order, config);
    orderResults[order.id] = result;
    res.status(200).json(result);
};

export const getOrderStatus = (req: Request, res: Response) => {
    const orderId = req.params.id;
    const result = orderResults[orderId];
    if (!result) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(result);
};
