import { Request, Response, NextFunction } from 'express';

export function validatePipelineConfig(req: Request, res: Response, next: NextFunction) {
    const config = req.body;
    if (!config || typeof config !== 'object') {
        return res.status(400).json({ error: 'La configuración del pipeline es requerida', code: 400 });
    }
    if (!('enabledFilters' in config)) {
        return res.status(400).json({ error: 'Falta el campo enabledFilters en la configuración', code: 400 });
    }
    if (!Array.isArray(config.enabledFilters)) {
        return res.status(400).json({ error: 'enabledFilters debe ser un array', code: 400 });
    }
    if (config.enabledFilters.length === 0) {
        return res.status(400).json({ error: 'Debe haber al menos un filtro habilitado', code: 400 });
    }
    if (!config.enabledFilters.every((f: any) => typeof f === 'string' && f.length > 0)) {
        return res.status(400).json({ error: 'Todos los filtros habilitados deben ser strings no vacíos', code: 400 });
    }
    next();
}
