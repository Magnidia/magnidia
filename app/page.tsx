import TicketCard from "@/components/TicketCard";
import { getEvents } from "@/utils/event";
import { Event } from "@prisma/client";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const events = await getEvents();

  if (!events) {
    return <p>No Events</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-24 gap-5">
      {events.map((event) => (
        <Link
          href={`/event/${event.id}`}
          className="bg-lightBlue w-50 p-10 rounded-lg"
        >
          <h1 className="font-bold text-lg">{event.name}</h1>
          <p>{event.address}</p>
          <p>{event.cityState}</p>
          <p>{event.description}</p>
        </Link>
      ))}
    </main>
  );
}
