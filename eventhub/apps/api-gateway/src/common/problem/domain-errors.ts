export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class EventNotFound extends DomainError {
  constructor(readonly eventId: string) {
    super(`Подію ${eventId} не знайдено`);
  }
}

export class InvalidCursor extends DomainError {
  constructor(readonly cursor: string) {
    super(`Некоректний курсор: ${cursor}`);
  }
}

export class RequestValidationFailed extends DomainError {
  constructor(readonly issues: Array<{ field: string; code: string; message: string }>) {
    super("Помилка валідації вхідних даних");
  }
}

export class SeatConflictError extends Error {
  constructor(detail: string = "Обране місце вже утримується або придбане іншим покупцем.") {
    super(detail);
    this.name = "SeatConflictError";
  }
}

export class EventCancelledError extends Error {
  constructor(
    detail: string = "Подія була скасована організатором і більше недоступна для замовлення.",
  ) {
    super(detail);
    this.name = "EventCancelledError";
  }
}

export class ForbiddenCancellationError extends Error {
  constructor(detail: string = "Ви не можете скасувати чуже замовлення.") {
    super(detail);
    this.name = "ForbiddenCancellationError";
  }
}

export class OrderStateConflictError extends Error {
  constructor(detail: string = "Замовлення вже було скасоване або завершене раніше.") {
    super(detail);
    this.name = "OrderStateConflictError";
  }
}

export class OrderNotFoundError extends Error {
  constructor(orderId: string) {
    super(`Замовлення ${orderId} не знайдено.`);
    this.name = "OrderNotFoundError";
  }
}
