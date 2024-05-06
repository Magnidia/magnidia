import db from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

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

  const session = await getServerSession(authOptions);

  if (!session || !ticket || ticket.userId !== session.user.id) {
    return;
  }

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
