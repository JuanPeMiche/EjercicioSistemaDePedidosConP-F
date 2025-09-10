import { Request, Response } from 'express';
import { orderPipeline } from '../services/orderPipelineServices';
import { PipelineConfig } from '../pipelines/orderPipeline';
import { PipelineResult } from '../pipelines/pipelineResult';
import { Order } from '../models/order';

// Almacén en memoria para resultados de procesamiento
const orderResults: Record<string, PipelineResult> = {};

export const processOrder = async (req: Request, res: Response) => {
        const order: Order = req.body;
        const config: PipelineConfig = { enabledFilters: orderPipeline.filters.map(f => f.name) };
        const result = await orderPipeline.process(order, config);
            // Simplified filterResults: only filter name and success
            const simplifiedFilterResults = orderPipeline.filters.map((filter, idx) => ({
                filter: filter.name,
                success: result.filterResults[idx]?.success ?? false
            }));
            const response = {
                success: result.success,
                finalOrder: result.finalOrder,
                filterResults: simplifiedFilterResults,
                executionTime: result.executionTime,
                failedAt: result.failedAt
            };
            orderResults[order.id] = result; // Store the full result for status endpoint
            res.status(200).json(response);
};

export const getOrderStatus = (req: Request, res: Response) => {
        const orderId = req.params.id;
        const result = orderResults[orderId];
        if (!result) {
                return res.status(404).json({ message: 'Order not found' });
        }
        // Simplified filterResults: only filter name and success
        const simplifiedFilterResults = orderPipeline.filters.map((filter, idx) => ({
            filter: filter.name,
            success: result.filterResults[idx]?.success ?? false
        }));
        const response = {
            success: result.success,
            finalOrder: result.finalOrder,
            filterResults: simplifiedFilterResults,
            executionTime: result.executionTime,
            failedAt: result.failedAt
        };
        res.status(200).json(response);
};
