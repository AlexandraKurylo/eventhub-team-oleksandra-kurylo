import { Controller, Get, Post, Body, Param, HttpCode } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { OrdersService } from "./orders.service";
import { ZodValidationPipe } from "../common/validation/zod-validation.pipe";
import { z } from "zod";

const createOrdersSchema = z.object({
  eventId: z.string().uuid(),
  seatIds: z.array(z.string().uuid()).min(1),
});

class CreateOrderDto {
  static zodSchema = createOrdersSchema;
  eventId!: string;
  seatIds!: string[];
}

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body(new ZodValidationPipe()) dto: CreateOrderDto) {
    return await this.ordersService.createOrder(dto);
  }

  @Get()
  async findAll() {
    return await this.ordersService.listOrders();
  }

  @Get(":orderId")
  async findOne(@Param("orderId") orderId: string) {
    return await this.ordersService.getOrder(orderId);
  }

  @Post(":orderId/cancel")
  @HttpCode(200)
  async cancel(@Param("orderId") orderId: string) {
    return await this.ordersService.cancelOrder(orderId);
  }
}
