import { describe, it, expect } from "vitest";
import {
  createOrderSchema,
  eventIdParam,
  listEventsQuery,
  orderIdParamSchema,
} from "../src/schemas";

describe("ADR-002: Zod Schemas Validation Integrity", () => {
  describe("listEventsQuery", () => {
    it("should accept valid query parameters with defaults", () => {
      const result = listEventsQuery.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(20);
      }
    });

    it("should reject limit exceeding maximum boundary (50)", () => {
      const result = listEventsQuery.safeParse({ limit: 100 });
      expect(result.success).toBe(false);
    });
  });

  describe("uuidLike (Custom UUID v7 validator)", () => {
    it("should accept valid standard UUID format", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      const result = eventIdParam.safeParse({ eventId: validUuid });
      expect(result.success).toBe(true);
    });

    it("should reject invalid UUID format", () => {
      const invalidUuid = "not-a-uuid";
      const result = eventIdParam.safeParse({ eventId: invalidUuid });
      expect(result.success).toBe(false);
    });
  });

  describe("createOrderSchema", () => {
    it("should accept valid order creation payload", () => {
      const validOrder = {
        eventId: "123e4567-e89b-12d3-a456-426614174000",
        seatIds: ["123e4567-e89b-12d3-a456-426614174001"],
      };
      const result = createOrderSchema.safeParse(validOrder);
      expect(result.success).toBe(true);
    });

    it("should reject order with empty seatIds array", () => {
      const invalidOrder = {
        eventId: "123e4567-e89b-12d3-a456-426614174000",
        seatIds: [],
      };
      const result = createOrderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });
  });

  describe("orderIdParamSchema", () => {
    it("should validate orderId correctly", () => {
      const validParam = { orderId: "123e4567-e89b-12d3-a456-426614174000" };
      expect(orderIdParamSchema.safeParse(validParam).success).toBe(true);
    });
  });
});
