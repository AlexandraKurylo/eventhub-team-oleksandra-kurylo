import {
  RequestValidationFailed,
  EventNotFound,
  InvalidCursor,
  SeatConflictError,
  EventCancelledError,
  ForbiddenCancellationError,
  OrderStateConflictError,
  OrderNotFoundError,
} from "./domain-errors";
import { HttpException } from "@nestjs/common";

export interface ProblemBody {
  type: string;
  title: string;
  status: number;
  detail?: string;
  errors?: unknown;
  instance?: string;
}

export function toProblem(err: unknown): ProblemBody {
  if (err instanceof RequestValidationFailed) {
    return {
      type: "/errors/invalid-query",
      title: "Некоректний параметр запиту",
      status: 400,
      detail: err.issues.map((i) => `${i.field}: ${i.message}`).join("; "),
      errors: err.issues,
    };
  }
  if (err instanceof EventNotFound) {
    return {
      type: "/errors/not-found",
      title: "Подію не знайдено",
      status: 404,
      detail: err.message,
    };
  }
  if (err instanceof OrderNotFoundError) {
    return {
      type: "/errors/not-found",
      title: "Замовлення не знайдено",
      status: 404,
      detail: err.message,
    };
  }
  if (err instanceof InvalidCursor) {
    return {
      type: "/errors/invalid-cursor",
      title: "Некоректний курсор",
      status: 400,
      detail: err.message,
    };
  }
  if (err instanceof SeatConflictError) {
    return {
      type: "/errors/seat-conflict",
      title: "Місце зайняте",
      status: 409,
      detail: err.message,
    };
  }
  if (err instanceof EventCancelledError) {
    return {
      type: "/errors/event-cancelled",
      title: "Подію скасовано",
      status: 410,
      detail: err.message,
    };
  }
  if (err instanceof ForbiddenCancellationError) {
    return {
      type: "/errors/forbidden",
      title: "Недостатньо прав",
      status: 403,
      detail: err.message,
    };
  }
  if (err instanceof OrderStateConflictError) {
    return {
      type: "/errors/order-state-conflict",
      title: "Неможливо скасувати замовлення",
      status: 409,
      detail: err.message,
    };
  }
  if (err instanceof HttpException) {
    const status = err.getStatus();
    return {
      type: status === 404 ? "/errors/not-found" : "/errors/http-error",
      title: err.name,
      status,
      detail: err.message,
    };
  }

  return {
    type: "about:blank",
    title: "Внутрішня помилка сервера",
    status: 500,
  };
}
