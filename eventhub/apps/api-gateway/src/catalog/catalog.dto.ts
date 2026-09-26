import { createZodDto } from "../common/validation/zod-dto";
import { listEventsQuery, eventIdParam } from "@eventhub/contracts";

export class ListEventsQueryDto extends createZodDto(listEventsQuery) {}
export class EventIdParamDto extends createZodDto(eventIdParam) {}
