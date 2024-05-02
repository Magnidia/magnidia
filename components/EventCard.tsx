import { FC } from "react";
import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  };

  return (
    <Link
      className="rounded-xl relative w-10/12 h-52 overflow-hidden p-10 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
      href={`/event/${event.id}`}
      key={event.id}
    >
      <Image
        className="w-full absolute top-0 left-0"
        width={0}
        height={0}
        sizes="100vw"
        src={event.imageUrl}
        alt="Image of event"
      />
      <div className="flex flex-row h-full items-center justify-between">
        <div className="flex flex-col h-full z-40 justify-end">
          <h1 className="text-4xl text-white font-bold">{event.name}</h1>
          <span className="text-lg text-white font-semibold">
            {event.city}, {event.state}
          </span>
        </div>
        <span className="text-xl text-white font-semibold z-40">
          {event.date.toLocaleTimeString("en-us", dateOptions)}
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
