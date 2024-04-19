"use client";

import { CreateEventRequest } from "@/types";
import { FC, useState } from "react";
import React from "react";

const CreateButton: FC = () => {
  const [eventDetails, setEventDetails] = useState<CreateEventRequest>({
    userId: "clv1g1vre0000438yjm6fj9fc",
    name: "",
    date: new Date(),
    description: "",
    address: "",
    cityState: "",
    latitude: 0,
    longitude: 0,
  });

  const createEvent = async () => {
    try {
      const response = await fetch(`/api/event`, {
        method: "POST",
        body: JSON.stringify(eventDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Event created successfully.");
        setEventDetails({
          userId: "clv1g1vre0000438yjm6fj9fc",
          name: "",
          date: new Date(),
          description: "",
          address: "",
          cityState: "",
          latitude: 0,
          longitude: 0,
        });
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const newValue =
      name === "date"
        ? new Date(value)
        : name === "latitude" || name === "longitude"
        ? parseFloat(value)
        : value;

    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          placeholder="Enter Event Name"
          name="name"
          value={eventDetails.name}
          onChange={handleInputChange}
          style={{ color: "black" }}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          value={eventDetails.date.toISOString().split("T")[0]}
          onChange={handleInputChange}
          style={{ color: "black" }}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          placeholder="Enter Description"
          name="description"
          value={eventDetails.description}
          onChange={handleInputChange}
          style={{ color: "black" }}
        ></textarea>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          placeholder="Enter Address"
          name="address"
          value={eventDetails.address}
          onChange={handleInputChange}
          style={{ color: "black" }}
        />
      </div>
      <div>
        <label htmlFor="cityState">City, State:</label>
        <input
          type="text"
          placeholder="Enter City, State"
          name="cityState"
          value={eventDetails.cityState}
          onChange={handleInputChange}
          style={{ color: "black" }}
        />
      </div>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          placeholder="Enter Latitude"
          name="latitude"
          value={eventDetails.latitude}
          onChange={handleInputChange}
          style={{ color: "black" }}
        />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          placeholder="Enter Longitude"
          name="longitude"
          value={eventDetails.longitude}
          onChange={handleInputChange}
          style={{ color: "black" }}
        />
      </div>
      <button onClick={createEvent}>Create Event</button>
    </div>
  );
};

export default CreateButton;
