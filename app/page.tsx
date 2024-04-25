import EventCard from "@/components/EventCard";
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
    <main className="min-h-screen flex flex-col items-center justify-start gap-10 pt-44 bg-lighterBlue">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </main>
  );
}
