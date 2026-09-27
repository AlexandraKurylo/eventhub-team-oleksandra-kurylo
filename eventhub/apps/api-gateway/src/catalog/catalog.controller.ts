import { Controller, Get, Param, Query } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CatalogService } from "./catalog.service";
import type { Event, EventPage } from "@eventhub/contracts";
import type { ListEventsQueryDto, EventIdParamDto } from "./catalog.dto";

@Controller("events")
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get()
  list(@Query() query: ListEventsQueryDto): Promise<EventPage> {
    return this.catalog.list(query);
  }

  @Get(":eventId")
  getOne(@Param() params: EventIdParamDto): Promise<Event> {
    return this.catalog.getOne(params.eventId);
  }
}
