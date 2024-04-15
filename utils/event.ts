import db from "./db";
import type { Event } from "@prisma/client";

export const getEvents = async () => {
  //const events: Event[] = await db.event.findMany();
  return null;
};

export const getEventById = async (id: number) => {
  const event = await db.event.findUnique({
    where: { id: +id },
    include: {
      creator: true,
    },
  });
  return event;
};
