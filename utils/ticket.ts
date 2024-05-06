import db from "@/utils/db";

export const getTicketById = async (id: number) => {
  const ticket = await db.ticket.findUnique({
    where: { id: +id },
    include: {
      user: true,
      event: {
        include: {
          creator: true,
        },
      },
    },
  });

  return ticket;
};

export const getTicketsByUserId = async (id: string) => {
  const tickets = await db.ticket.findMany({
    where: { userId: id },
    include: {
      event: true,
    },
  });

  return tickets;
};
