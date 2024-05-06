"use client";

import { FC } from "react";
import { Prisma } from "@prisma/client";
import { IoIosPin, IoIosCalendar } from "react-icons/io";
import { Button } from "@rewind-ui/core";

type TicketWithEvent = Prisma.TicketGetPayload<{
  include: { event: true };
}>;

interface TicketCardProps {
  ticket: TicketWithEvent;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }: TicketCardProps) => {
  const event = ticket.event;

  const dayOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    year: "numeric",
    month: "long",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };

  return (
    <div className="w-[22rem] bg-white rounded-xl border border-[#05233E]">
      <div className="flex flex-col mt-3 gap-2">
        <span className="m-auto">
          <span className="font-bold uppercase">Date Purchased: </span>
          {ticket.purchaseDate.toLocaleDateString("en-us", dateOptions)}
        </span>
        <div className="flex flex-row p-5 justify-start">
          <IoIosPin className="w-12 h-auto text-[#05233E] mr-5" />
          <div className="flex flex-col">
            <span>{event.address}</span>
            <span>
              {event.city}, {event.state}
            </span>
          </div>
        </div>
        <div className="flex flex-row px-5 justify-start mb-8">
          <IoIosCalendar className="w-12 h-auto text-[#05233E] mr-5" />
          <div className="flex flex-col">
            <span>{event.date.toLocaleDateString("en-us", dayOptions)}</span>
            <span>{event.date.toLocaleDateString("en-us", dateOptions)}</span>
          </div>
        </div>
        <div className="flex flex-row bg-darkBlue mb-2 h-20 justify-around">
          <div className="flex flex-col justify-center text-center w-full">
            <span className="font-semibold text-white">START</span>
            <span className="text-white">
              {event.startTime.toLocaleTimeString("en-us", timeOptions)}
            </span>
          </div>
          <div className="w-px h-full bg-white align-middle"></div>
          <div className="flex flex-col justify-center text-center w-full">
            <span className="font-semibold text-white">END</span>
            <span className="text-white">
              {event.endTime.toLocaleTimeString("en-us", timeOptions)}
            </span>
          </div>
        </div>
        {ticket.valid ? (
          <div className="bg-green-200 rounded-full text-center mb-2 px-2 w-fit m-auto">
            <span className="uppercase text-sm">
              This ticket has not been used
            </span>
          </div>
        ) : (
          <div className="bg-red-200 rounded-full text-center mb-2 px-2 w-fit m-auto">
            <span className="uppercase text-sm">This ticket has been used</span>
          </div>
        )}
        <div className="text-center w-full border-dashed border-t-2 border-[#05233E] p-5">
          <Button color="gray" shadow="base" size="lg">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
