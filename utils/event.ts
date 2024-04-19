import db from "./db";

export const getEvents = async () => {
  const events = await db.event.findMany();
  return events;
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
