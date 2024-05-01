"use client";

import { FC } from "react";
import { Event } from "@prisma/client";

import { IoIosPin, IoIosCalendar } from "react-icons/io";

interface TicketCardProps {
  event: Event;
}

const TicketCard: FC<TicketCardProps> = ({ event }) => {
  const dayOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

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
    <div className="fixed top-60 right-10 w-72 bg-white rounded-lg border border-[#05233E]">
      <div className="flex flex-col mt-3">
        <div className="flex flex-row p-5 justify-start">
          <IoIosPin className="w-12 h-auto text-[#05233E] mr-5" />
          <div className="flex flex-col">
            <span>{event.address}</span>
            <span>
              {event.city}, {event.state}
            </span>
          </div>
        </div>
        <div className="flex flex-row px-5 justify-start mb-10">
          <IoIosCalendar className="w-12 h-auto text-[#05233E] mr-5" />
          <div className="flex flex-col">
            <span>{event.date.toLocaleDateString("en-us", dayOptions)}</span>
            <span>{event.date.toLocaleDateString("en-us", dateOptions)}</span>
          </div>
        </div>
        <div className="flex flex-row bg-darkBlue mb-5 h-20 justify-around">
          <div className="flex flex-col justify-center text-center w-full">
            <span className="font-semibold text-white">START</span>
            <span className="text-white">
              {event.date.toLocaleTimeString("en-us", timeOptions)}
            </span>
          </div>
          <div className="w-px h-full bg-white align-middle"></div>
          <div className="flex flex-col justify-center text-center w-full">
            <span className="font-semibold text-white">END</span>
            <span className="text-white">
              {event.date.toLocaleTimeString("en-us", timeOptions)}
            </span>
          </div>
        </div>
        <div className="text-center w-full border-dashed border-t-2 border-[#05233E] p-5">
          <button className="w-11/12 bg-lightBlue rounded-md hover:bg-primary">
            <div className="flex flex-row justify-between py-3 px-7">
              <div className="flex flex-col">
                <span className="font-semibold">PRICE</span>
                <span>${event.price}</span>
              </div>
              <div className="flex flex-col justify-center h-full pt-2.5">
                <span>GET TICKET</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
