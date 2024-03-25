import db from "./db";
import type { Event } from "@prisma/client";

export const getEvents = async () => {
  const events: Event[] = await db.event.findMany();
  return events;
};
