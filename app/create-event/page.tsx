"use client"

import CreateButton from "@/components/CreateButton";

export default function CreateEventPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-12">Create Event</h1>
      <CreateButton />
    </div>
  );
}
