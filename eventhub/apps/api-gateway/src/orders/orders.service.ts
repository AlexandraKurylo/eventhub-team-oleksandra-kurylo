import { Injectable } from "@nestjs/common";
import type { OrdersRepository, Order } from "./orders.repository";
import { OrderNotFoundError, OrderStateConflictError } from "../common/problem/domain-errors";
import { randomUUID } from "node:crypto";

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrdersRepository) {}

  async createOrder(dto: { eventId: string; seatIds: string[] }): Promise<Order> {
    const newOrder: Order = {
      id: randomUUID(),
      eventId: dto.eventId,
      status: "pending",
      createdAt: new Date().toISOString(),
      totalPrice: { amount: dto.seatIds.length * 25000, currency: "UAH" },
      seatIds: dto.seatIds,
    };
    return await this.repo.create(newOrder);
  }

  async listOrders(): Promise<Order[]> {
    return await this.repo.findAll();
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.repo.findById(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
  }

  async cancelOrder(id: string): Promise<Order> {
    const order = await this.repo.findById(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    if (order.status === "cancelled") {
      throw new OrderStateConflictError();
    }

    order.status = "cancelled";
    return await this.repo.update(order);
  }
}
