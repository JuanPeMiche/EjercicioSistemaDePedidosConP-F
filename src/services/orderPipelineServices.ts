import { OrderPipeline, PipelineConfig } from '../pipelines/orderPipeline';
import { Order } from '../models/order';
import { OrderFilter } from '../filters/orderFilter';
import { PipelineResult } from '../pipelines/pipelineResult';
import { FilterResult } from '../filters/filterResult';

class BasicOrderPipeline implements OrderPipeline {
    filters: OrderFilter[] = [];

    addFilter(filter: OrderFilter): void {
        this.filters.push(filter);
    }

    removeFilter(filterName: string): void {
        this.filters = this.filters.filter(f => f.name !== filterName);
    }

    async process(order: Order, config: PipelineConfig): Promise<PipelineResult> {
        const start = Date.now();
        let currentOrder = { ...order };
        const filterResults: FilterResult[] = [];
        let failedAt: string | undefined = undefined;
        let success = true;

        for (const filter of this.filters) {
            if (config.enabledFilters.includes(filter.name)) {
                try {
                    const result = await filter.process(currentOrder, {});
                    filterResults.push(result);
                    currentOrder = result.order;
                    if (!result.success) {
                        success = false;
                        failedAt = filter.name;
                        break;
                    }
                } catch (err) {
                    success = false;
                    failedAt = filter.name;
                    filterResults.push({ success: false, order: currentOrder, errors: [String(err)], warnings: [] });
                    break;
                }
            }
        }

        const executionTime = Date.now() - start;
        return {
            success,
            finalOrder: currentOrder,
            filterResults,
            executionTime,
            failedAt,
        };
    }
}

// Importar los filtros concretos
import { CustomerValidationFilter } from '../filters/concreteFilters/customerValidationFilter';
import { ProductValidationFilter } from '../filters/concreteFilters/productValidationFilter';
import { DataIntegrityFilter } from '../filters/concreteFilters/dataIntegrityFilter';
import { PriceCalculationFilter } from '../filters/concreteFilters/priceCalculationFilter';
import { MembershipDiscountFilter } from '../filters/concreteFilters/membershipDiscountFilter';
import { VolumeDiscountFilter } from '../filters/concreteFilters/volumeDiscountFilter';
import { TaxCalculationFilter } from '../filters/concreteFilters/taxCalculationFilter';
import { PaymentProcessingFilter } from '../filters/concreteFilters/paymentProcessingFilter';

export const orderPipeline = new BasicOrderPipeline();

// Registrar los filtros en el orden correcto
orderPipeline.addFilter(new CustomerValidationFilter());
orderPipeline.addFilter(new ProductValidationFilter());
orderPipeline.addFilter(new DataIntegrityFilter());
orderPipeline.addFilter(new PriceCalculationFilter());
orderPipeline.addFilter(new MembershipDiscountFilter());
orderPipeline.addFilter(new VolumeDiscountFilter());
orderPipeline.addFilter(new TaxCalculationFilter());
orderPipeline.addFilter(new PaymentProcessingFilter());
