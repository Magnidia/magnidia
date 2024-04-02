import { getEvents } from "@/utils/event";
import { Event } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Events List</h1>
    </main>
  );
}
