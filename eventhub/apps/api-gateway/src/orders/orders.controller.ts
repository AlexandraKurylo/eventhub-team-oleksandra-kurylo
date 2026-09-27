import { Controller, Get, Post, Body, Param, HttpCode } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { OrdersService } from "./orders.service";
import { ZodValidationPipe } from "../common/validation/zod-validation.pipe";
import type { CreateOrderDto, OrderIdParamDto } from "./orders.dto";

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
  async findOne(@Param(new ZodValidationPipe()) params: OrderIdParamDto) {
    return await this.ordersService.getOrder(params.orderId);
  }

  @Post(":orderId/cancel")
  @HttpCode(200)
  async cancel(@Param(new ZodValidationPipe()) params: OrderIdParamDto) {
    return await this.ordersService.cancelOrder(params.orderId);
  }
}
