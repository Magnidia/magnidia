import { useMemo } from "react";
import Image from "next/image";
import { Event } from "@prisma/client";
import { getEventById } from "@/utils/event";
import Map from "@/components/Map";
import TicketCard from "@/components/TicketCard";
import Link from "next/link";

import { IoIosHeart, IoMdShare } from "react-icons/io";

export default async function Home({ params }: { params: { id: number } }) {
  const event = await getEventById(params.id);
  if (!event) {
    return <p>Event Not Found.</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {event ? (
        <>
          <div className="w-full">
            <div className="w-full h-96 relative overflow-hidden">
              <Image
                alt="Event Image"
                src={event.images[0]}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              ></Image>
              <h1 className="text-5xl z-10 absolute top-56 left-10 font-semibold text-white">
                {event.name.toUpperCase()}
              </h1>
              <div className="flex flex-row gap-6 text-3xl z-10 absolute top-80 left-10">
                <IoIosHeart className="cursor-pointer text-white" />
                <IoMdShare className="cursor-pointer text-white" />
              </div>
            </div>
            <div className="p-10">
              <h2 className="text-4xl mb-5">EVENT INFORMATION:</h2>
              <p>{event.description}</p>
            </div>
            <div className="p-10">
              <h2 className="text-4xl mb-5">LOCATION:</h2>
              <Map
                latitude={event.latitude}
                longitude={event.longitude}
                styles={{ width: "65%", height: "500px" }}
              />
            </div>
            <div className="p-10">
              <h2 className="text-4xl mb-5">ABOUT THE ORGANIZER:</h2>
              <div className="w-2/4 bg-lightBlue p-5 rounded-md">
                <h1 className="text-2xl">{event.creator.name}</h1>
                <Link
                  href={`/user/${event.userId}`}
                  className="text-sm italic cursor-pointer hover:underline"
                >
                  @{event.creator.email}
                </Link>
                <p className="mt-4">
                  <span className="font-bold">Contact: </span>
                  {event.creator.email}
                </p>
              </div>
            </div>
          </div>
          <TicketCard event={event}></TicketCard>
        </>
      ) : (
        <h1 className="text-4xl font-bold mt-20">Event Not Found</h1>
      )}
    </main>
  );
}
