import EventCard from "@/components/EventCard";
import { getEvents } from "@/utils/event";

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
