import { Request, Response } from 'express';
import { PipelineConfig } from '../pipelines/orderPipeline';

// Configuración en memoria para el pipeline
let pipelineConfig: PipelineConfig = {
    // Inicializar con todos los filtros registrados en el pipeline
    enabledFilters: [
        'CustomerValidationFilter',
        'ProductValidationFilter',
        'DataIntegrityFilter',
        'PriceCalculationFilter',
        'MembershipDiscountFilter',
        'VolumeDiscountFilter',
        'TaxCalculationFilter',
        'PaymentProcessingFilter'
    ]
};

export const getPipelineConfig = (req: Request, res: Response) => {
    res.status(200).json(pipelineConfig);
};

export const updatePipelineConfig = (req: Request, res: Response) => {
    const newConfig = req.body;
    pipelineConfig = { ...pipelineConfig, ...newConfig };
    res.status(200).json(pipelineConfig);
};
