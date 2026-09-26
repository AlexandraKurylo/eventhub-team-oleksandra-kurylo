import { createZodDto } from "../common/validation/zod-dto";
import { createOrderSchema, orderIdParamSchema } from "@eventhub/contracts";

export class CreateOrderDto extends createZodDto(createOrderSchema) {}
export class OrderIdParamDto extends createZodDto(orderIdParamSchema) {}
