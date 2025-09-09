import { Request, Response } from 'express';
import { PipelineConfig } from '../pipelines/orderPipeline';

// Configuración en memoria para el pipeline
let pipelineConfig: PipelineConfig = {
    enabledFilters: [] // Se puede inicializar con los nombres de los filtros activos
};

export const getPipelineConfig = (req: Request, res: Response) => {
    res.status(200).json(pipelineConfig);
};

export const updatePipelineConfig = (req: Request, res: Response) => {
    const newConfig = req.body;
    pipelineConfig = { ...pipelineConfig, ...newConfig };
    res.status(200).json(pipelineConfig);
};
