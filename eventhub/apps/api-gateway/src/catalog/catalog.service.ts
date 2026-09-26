import { Injectable } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventRepository } from "./event.repository";
import type { Event, EventPage, ListEventsQuery } from "@eventhub/contracts";

@Injectable()
export class CatalogService {
  constructor(private readonly repo: EventRepository) {}

  async list(query: ListEventsQuery): Promise<EventPage> {
    // Реалізація пагінації та фільтрації буде на кроці 4
    const rows = await this.repo.find({
      limit: query.limit ?? 20,
      city: query.city,
      from: query.from,
    });
    return {
      items: rows,
      nextCursor: null,
    };
  }

  async getOne(eventId: string): Promise<Event> {
    const event = await this.repo.byId(eventId);
    if (!event) {
      throw new Error(`Event with id ${eventId} not found`);
    }
    return event;
  }
}
