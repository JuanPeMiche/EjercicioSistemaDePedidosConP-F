import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // Errores personalizados con statusCode y code
    if (err.statusCode && err.code) {
        return res.status(err.statusCode).json({ error: err.message, code: err.code });
    }
    // Errores de validación
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message || 'Error de validación', code: 400 });
    }
    // Errores de autenticación
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'No autorizado', code: 401 });
    }
    // Errores de conflicto
    if (err.name === 'ConflictError') {
        return res.status(409).json({ error: err.message || 'Conflicto', code: 409 });
    }
    // Errores de recurso no encontrado
    if (err.name === 'NotFoundError') {
        return res.status(404).json({ error: err.message || 'No encontrado', code: 404 });
    }
    // Otros errores
    return res.status(500).json({ error: 'Error interno del servidor', code: 500 });
}
