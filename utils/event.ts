import db from "./db";
import { Event } from "@prisma/client";

export const getEvents = async () => {
  const events: Event[] = await db.event.findMany();
  return events;
};

export const getEventById = async (id: number) => {
  const event: Event | null = await db.event.findUnique({
    where: { id: +id },
  });
  return event;
};
