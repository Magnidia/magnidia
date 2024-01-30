import { getEvents } from "@/utils/event";
import { Event } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const events: Event[] = await getEvents();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Events List</h1>
      {events.map((event) => (
        <p key={event.id}>{event.name}</p>
      ))}
    </main>
  );
}
