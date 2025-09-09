import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/order';

export function validateRequest(req: Request, res: Response, next: NextFunction) {
    // Validar POST /orders/process
    if (req.method === 'POST' && req.path === '/orders/process') {
        const order: Order = req.body;
        if (!order || typeof order !== 'object') {
            return res.status(400).json({ error: 'El pedido es requerido', code: 400 });
        }
        if (!order.id || typeof order.id !== 'string') {
            return res.status(400).json({ error: 'El id del pedido es requerido', code: 400 });
        }
        if (!order.customerId || typeof order.customerId !== 'string') {
            return res.status(400).json({ error: 'El id del cliente es requerido', code: 400 });
        }
        if (!Array.isArray(order.items) || order.items.length === 0) {
            return res.status(400).json({ error: 'El pedido debe tener al menos un item', code: 400 });
        }
        if (!order.createdAt || isNaN(Date.parse(order.createdAt as any))) {
            return res.status(400).json({ error: 'La fecha de creación es inválida', code: 400 });
        }
    }

    // Validar GET /orders/:id/status
    if (req.method === 'GET' && req.path.match(/^\/orders\/.+\/status$/)) {
        if (!req.params.id || typeof req.params.id !== 'string') {
            return res.status(400).json({ error: 'El id del pedido es requerido en la ruta', code: 400 });
        }
    }

    // Validar PUT /pipeline/config
    if (req.method === 'PUT' && req.path === '/pipeline/config') {
        const config = req.body;
        if (!config || !Array.isArray(config.enabledFilters)) {
            return res.status(400).json({ error: 'Configuración de pipeline inválida: enabledFilters debe ser un array', code: 400 });
        }
    }

    next();
}
