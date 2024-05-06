"use client";

import { FC } from "react";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Button } from "@rewind-ui/core";
import Link from "next/link";

type TicketWithEvent = Prisma.TicketGetPayload<{
  include: { event: true };
}>;

interface TicketCardProps {
  ticket: TicketWithEvent;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }: TicketCardProps) => {
  const { event } = ticket;

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    year: "numeric",
    month: "long",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };

  return (
    <div className="flex flex-row overflow-hidden rounded-md shadow-xl w-1/2 h-40 gap-5">
      <div className="w-1/4 h-full overflow-hidden">
        <Image
          src={ticket.event.imageUrl}
          height={0}
          width={400}
          alt="Event Image"
          className="min-w-[40rem] h-auto"
        ></Image>
      </div>
      <div className="flex flex-col w-1/2 py-5 gap-2">
        <h1 className="text-3xl text-darkBlue font-semibold">
          {event.date.toLocaleDateString("en-us", dateOptions)}
        </h1>
        <span className="text-md">
          {event.startTime.toLocaleTimeString("en-us", timeOptions)} -{" "}
          {event.endTime.toLocaleTimeString("en-us", timeOptions)}
        </span>
        <span className="text-lg font-bold">{event.name}</span>
      </div>
      <div className="flex flex-col justify-end items-end w-1/4 p-5">
        <Link href={`/ticket/${ticket.id}`}>
          <Button color="gray" shadow="base" radius="full">
            View Ticket
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
