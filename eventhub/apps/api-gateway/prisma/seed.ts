import { PrismaClient, SeatStatus } from "@prisma/client";

const prisma = new PrismaClient();

const VENUES = [
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e80", name: "Оперний театр", city: "Київ" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e81", name: "КВЦ Парковий", city: "Київ" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e82", name: "Мистецький Арсенал", city: "Львів" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e83", name: "Палац спорту", city: "Харків" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e84", name: "Stereo Plaza", city: "Київ" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e85", name: "Nesterka House", city: "Одеса" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e86", name: "Arena Lviv", city: "Львів" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e87", name: "Vystavkovyi Tsentr", city: "Київ" },
  { id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e88", name: "Theater of Comedy", city: "Одеса" },
];

const EVENTS = [
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9f",
    title: "Концерт класичної музики",
    description: "Вечір симфонічної музики під відкритим небом.",
    startsAt: new Date("2026-10-01T18:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e80",
    minPriceCents: 60000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9e",
    title: "IT-конференція 2026",
    description: "Масштабна подія для розробників та архітекторів.",
    startsAt: new Date("2026-10-01T18:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e81",
    minPriceCents: 150000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9d",
    title: "Виставка сучасного мистецтва",
    description: "Роботи провідних українських художників.",
    startsAt: new Date("2026-10-05T12:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e82",
    minPriceCents: 25000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9c",
    title: "Рок-концерт: The Hardkiss",
    description: "Неймовірний живий звук та улюблені хіти.",
    startsAt: new Date("2026-10-10T19:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e84",
    minPriceCents: 120000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9b",
    title: "Стендап-вечір: Василь Байдак",
    description: "Нові жарти та чудова атмосфера.",
    startsAt: new Date("2026-10-15T18:30:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e83",
    minPriceCents: 50000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9a",
    title: "Фестиваль електронної музики",
    description: "Ніч якісного техно та хаус-ритмів.",
    startsAt: new Date("2026-10-20T21:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e84",
    minPriceCents: 140000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e99",
    title: "Джазовий вечір із Джамалою",
    description: "Вишуканий вокал та живі інструменти.",
    startsAt: new Date("2026-10-25T19:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e80",
    minPriceCents: 90000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e98",
    title: "Театральна вистава: Мартин Боруля",
    description: "Класична українська сатира на сучасний лад.",
    startsAt: new Date("2026-10-28T18:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e82",
    minPriceCents: 40000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e97",
    title: "Хіп-хоп батл та шоу",
    description: "Найкращі андеграундні виконавці та брейкданс.",
    startsAt: new Date("2026-11-02T19:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e83",
    minPriceCents: 65000,
    currency: "UAH",
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e96",
    title: "Новорічний розігрів: Open Air",
    description: "Святковий настрій, музика та яскраві емоції.",
    startsAt: new Date("2026-11-10T20:00:00Z"),
    venueId: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e81",
    minPriceCents: 100000,
    currency: "UAH",
    availableSeats: 80,
  },
];

async function main() {
  console.log("Start seeding...");

  for (const v of VENUES) {
    await prisma.venue.upsert({
      where: { id: v.id },
      update: { name: v.name, city: v.city },
      create: v,
    });
  }

  for (const e of EVENTS) {
    await prisma.event.upsert({
      where: { id: e.id },
      update: e,
      create: e,
    });
  }

  await prisma.seat.deleteMany({});

  const seatsToCreate = [];

  for (const event of EVENTS) {
    for (let r = 1; r <= 8; r++) {
      for (let n = 1; n <= 10; n++) {
        seatsToCreate.push({
          eventId: event.id,
          rowLabel: String(r),
          number: n,
          priceCents: event.minPriceCents,
          status: SeatStatus.FREE,
        });
      }
    }
  }

  await prisma.seat.createMany({
    data: seatsToCreate,
    skipDuplicates: true,
  });

  console.log(
    `Створено ${VENUES.length} майданчиків, ${EVENTS.length} подій, ${seatsToCreate.length} місць`,
  );
  console.log(`Seeding finished successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
