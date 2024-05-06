"use client";

import { FC, useState } from "react";
import { Button } from "@rewind-ui/core";
import { Event, Prisma } from "@prisma/client";
import EventCard from "./EventCard";
import MyTicketCard from "./MyTicketCard";

type TicketWithEvent = Prisma.TicketGetPayload<{
  include: { event: true };
}>;

interface UserInformationProps {
  tickets: TicketWithEvent[];
  events: Event[];
}

const UserInformation: FC<UserInformationProps> = ({
  tickets,
  events,
}: UserInformationProps) => {
  const [showTickets, setShowTickets] = useState(true);

  return (
    <>
      <div className="w-full flex flex-row justify-start p-10 gap-5">
        <Button
          shadow="base"
          radius="full"
          size="lg"
          color={showTickets ? "blue" : "gray"}
          className={showTickets ? "bg-darkBlue hover:bg-[#126CBE]" : ""}
          onClick={() => setShowTickets(true)}
        >
          My Tickets
        </Button>
        <Button
          shadow="base"
          radius="full"
          size="lg"
          color={!showTickets ? "blue" : "gray"}
          className={!showTickets ? "bg-darkBlue hover:bg-[#126CBE]" : ""}
          onClick={() => setShowTickets(false)}
        >
          My Events
        </Button>
      </div>
      <div className="w-full flex flex-col items-start p-10 gap-5">
        {!showTickets &&
          events.map((event) => <EventCard event={event} key={event.id} />)}
        {showTickets &&
          tickets.map((ticket) => (
            <MyTicketCard ticket={ticket} key={ticket.id} />
          ))}
      </div>
    </>
  );
};

export default UserInformation;
