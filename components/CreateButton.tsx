"use client";

import { CreateEventRequest } from "@/types";
import { Event } from "@prisma/client";
import { FC } from "react";

const CreateButton: FC = () => {
  const createEvent = async () => {
    const eventRequest: CreateEventRequest = {
      name: "New Event",
      date: new Date(),
      location: "Atlanta, GA",
      creator: "Ian Wood",
    };

    const response = await fetch(`/api/event`, {
      method: "POST",
      body: JSON.stringify(eventRequest),
    });
  };

  return <button onClick={createEvent}>Create Event</button>;
};

export default CreateButton;
