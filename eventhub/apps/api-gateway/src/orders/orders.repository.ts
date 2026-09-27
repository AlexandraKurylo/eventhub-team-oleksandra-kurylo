import { Injectable } from "@nestjs/common";

export interface Order {
  id: string;
  eventId: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  totalPrice: { amount: number; currency: "UAH" };
  seatIds: string[];
}

@Injectable()
export class OrdersRepository {
  private orders: Map<string, Order> = new Map();

  async create(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) ?? null;
  }

  async update(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }
}
