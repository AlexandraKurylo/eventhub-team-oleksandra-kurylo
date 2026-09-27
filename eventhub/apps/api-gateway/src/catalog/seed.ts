import type { Event } from "@eventhub/contracts";

export const EVENTS: Event[] = [
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9f",
    title: "Концерт класичної музики",
    description: "Вечір симфонічної музики під відкритим небом.",
    startsAt: "2026-10-01T18:00:00Z",
    venue: {
      id: "venue-1",
      name: "Оперний театр",
      city: "Київ",
    },
    minPrice: {
      amount: 60000,
      currency: "UAH",
    },
    availableSeats: 150,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9e",
    title: "IT-конференція 2026",
    description: "Масштабна подія для розробників та архітекторів.",
    startsAt: "2026-10-01T18:00:00Z",
    venue: {
      id: "venue-2",
      name: "КВЦ Парковий",
      city: "Київ",
    },
    minPrice: {
      amount: 150000,
      currency: "UAH",
    },
    availableSeats: 300,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9d",
    title: "Виставка сучасного мистецтва",
    description: "Роботи провідних українських художників.",
    startsAt: "2026-10-05T12:00:00Z",
    venue: {
      id: "venue-3",
      name: "Мистецький Арсенал",
      city: "Львів",
    },
    minPrice: {
      amount: 25000,
      currency: "UAH",
    },
    availableSeats: 80,
  },
];
