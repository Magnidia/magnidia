"use client";

import Map from "@/components/Map";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Input, Textarea, Button } from "@rewind-ui/core";
import { isValid, format } from "date-fns";

interface EventData {
  name: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  address: string;
  city: string;
  state: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  price: number;
  userId: string;
}

export default function Home() {
  const initialEventData: EventData = {
    name: "",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    address: "",
    city: "",
    state: "",
    description: "",
    imageUrl: "",
    latitude: 0,
    longitude: 0,
    price: 0,
    userId: "clv1g1vre0000438yjm6fj9fc",
  };

  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>(initialEventData);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const setCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `/api/geocode/${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data) {
        const { lat, lng } = data;
        setEventData((prevState) => ({
          ...prevState,
          latitude: lat,
          longitude: lng,
        }));
      }
    } catch (error) {
      console.error("Unable to retrieve coordinates.", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newDate = new Date(eventData.date);
    const [hours, minutes] = value.split(":").map(Number);
    newDate.setHours(hours, minutes);
    setEventData((prevState) => ({
      ...prevState,
      [name]: newDate,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (
      !imageInputRef.current?.files ||
      imageInputRef.current?.files.length === 0
    ) {
      alert("Please upload an image.");
      return;
    }
    formData.append("file", imageInputRef.current?.files[0]);
    const res = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setEventData((prevState) => ({
      ...prevState,
      imageUrl: data.imageUrl,
    }));

    try {
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...eventData, imageUrl: data.imageUrl }),
      });
      const newEvent = await response.json();
      setEventData(initialEventData);
      router.push(`/event/${newEvent.eventId}`);
    } catch (error) {
      console.error("Unable to create event.", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-lighterBlue pt-44">
      <div className="rounded-md border border-black bg-white w-10/12 mb-20">
        {eventData && (
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap lg:flex-nowrap p-10 gap-10">
              <div className="flex flex-col w-full">
                <h1 className="font-bold text-2xl">NAME OF EVENT:</h1>
                <Input
                  type="text"
                  placeholder="NAME"
                  className="p-1 mt-4"
                  value={eventData.name}
                  onChange={handleChange}
                  name="name"
                />
                <span className="font-bold text-lg mt-8">DESCRIPTION:</span>
                <Textarea
                  placeholder="DESCRIPTION"
                  className="h-64 mt-4 pt-3"
                  value={eventData.description}
                  onChange={handleChange}
                  name="description"
                  size="lg"
                />
                <span className="font-bold text-lg mt-8">COVER PHOTO:</span>
                <Input
                  color="blue"
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  className="w-full m-auto mt-4"
                />
              </div>
              <div className="flex flex-col w-full">
                <span className="font-bold text-lg">SET LOCATION:</span>
                <Input
                  placeholder="ADDRESS"
                  className="p-1 mt-4"
                  value={eventData.address}
                  onChange={handleChange}
                  name="address"
                />
                <Input
                  placeholder="CITY"
                  className="p-1 mt-4"
                  value={eventData.city}
                  onChange={handleChange}
                  name="city"
                />
                <div className="flex flex-row items-center gap-5">
                  <Input
                    placeholder="STATE"
                    className="p-1 mt-4"
                    value={eventData.state}
                    onChange={handleChange}
                    name="state"
                  />
                  <Button
                    className="mt-4"
                    onClick={() => {
                      setCoordinates(
                        `${eventData.address}, ${eventData.city}, ${eventData.state}`
                      );
                    }}
                  >
                    CONFIRM
                  </Button>
                </div>
                <Map
                  lat={eventData.latitude}
                  lng={eventData.longitude}
                  styles={{
                    width: "100%",
                    height: "190px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    marginTop: "2rem",
                  }}
                />
                <span className="font-bold text-lg mt-8">SET PRICE:</span>
                <div className="flex flex-row items-center">
                  <Input
                    placeholder="PRICE"
                    className="p-1 mt-4"
                    type="number"
                    value={eventData.price}
                    onChange={(event) => {
                      const { name, valueAsNumber } = event.target;
                      setEventData((prevState) => ({
                        ...prevState,
                        [name]: valueAsNumber,
                      }));
                    }}
                    name="price"
                  />
                  <span className="font-bold text-lg mt-4 ml-4">USD</span>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-bold text-lg">SET DATE:</span>
                <Calendar
                  value={eventData.date}
                  onChange={(date) => {
                    if (date && isValid(date)) {
                      setEventData((prevState) => ({
                        ...prevState,
                        date,
                      }));
                    }
                  }}
                  disabledWeekends={false}
                  shadow="md"
                  size="lg"
                  className="mt-8"
                />
                <span className="font-bold text-lg mt-7">SET DURATION:</span>
                <div className="flex flex-row items-center">
                  <Input
                    className="p-1 mt-4"
                    type="time"
                    value={format(eventData.startTime, "HH:mm")}
                    onChange={handleTimeChange}
                    name="startTime"
                  />
                  <span className="font-bold text-lg mt-4 mx-4">TO</span>
                  <Input
                    className="p-1 mt-4"
                    type="time"
                    value={format(eventData.endTime, "HH:mm")}
                    onChange={handleTimeChange}
                    name="endTime"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full border-t-2 border-dashed border-black p-10">
              <Button
                className="w-10/12 max-w-md"
                color="blue"
                shadow="base"
                size="lg"
                onClick={handleSubmit}
              >
                PUBLISH
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
