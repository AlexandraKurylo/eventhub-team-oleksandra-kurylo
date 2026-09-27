import { Injectable } from "@nestjs/common";
import { EventRepository } from "./event.repository";
import type { Event, EventPage, ListEventsQuery } from "@eventhub/contracts";
import { encodeCursor, decodeCursor } from "./cursor";
import { EventNotFound } from "../common/problem/domain-errors";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
EventRepository;

@Injectable()
export class CatalogService {
  constructor(private readonly repo: EventRepository) {}

  async list(query: ListEventsQuery): Promise<EventPage> {
    const after = query.cursor ? decodeCursor(query.cursor) : undefined;
    const limit = query.limit ?? 20;

    const rows = await this.repo.find({
      city: query.city,
      from: query.from,
      after,
      limit: limit + 1,
    });

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const last = items.at(-1);

    return {
      items,
      nextCursor: hasMore && last ? encodeCursor({ startsAt: last.startsAt, id: last.id }) : null,
    };
  }

  async getOne(eventId: string): Promise<Event> {
    const event = await this.repo.byId(eventId);
    if (!event) {
      throw new EventNotFound(eventId);
    }
    return event;
  }
}
