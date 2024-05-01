"use client";

import Map from "@/components/Map";
import { useState } from "react";
import { Calendar, Input, Textarea, Button } from "@rewind-ui/core";
import { IoMdCloudUpload } from "react-icons/io";
import { isValid, format } from "date-fns";

interface FormData {
  name: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  address: string;
  city: string;
  state: string;
  description: string;
  images: string[];
  latitude: number;
  longitude: number;
  price: number;
}

const CreateEventPage = () => {
  const initialFormData: FormData = {
    name: "",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    address: "",
    city: "",
    state: "",
    description: "",
    images: [],
    latitude: 0,
    longitude: 0,
    price: 0,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newDate = new Date(formData.date);
    const [hours, minutes] = value.split(":").map(Number);
    newDate.setHours(hours, minutes);
    setFormData((prevState) => ({
      ...prevState,
      [name]: newDate,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData(initialFormData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-lighterBlue pt-44">
      <div className="rounded-md border border-black bg-white w-10/12 mb-20">
        {formData && (
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap lg:flex-nowrap p-10 gap-10">
              <div className="flex flex-col w-full">
                <h1 className="font-bold text-2xl">NAME OF EVENT:</h1>
                <Input
                  type="text"
                  placeholder="NAME"
                  className="p-1 mt-4"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
                <span className="font-bold text-lg mt-8">DESCRIPTION:</span>
                <Textarea
                  placeholder="DESCRIPTION"
                  className="h-72 mt-4 pt-3"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  size="lg"
                />
                <Button
                  className="w-full m-auto mt-8"
                  color="gray"
                  size="lg"
                  shadow="base"
                >
                  UPLOAD IMAGE
                  <IoMdCloudUpload className="text-xl inline-block ml-3" />
                </Button>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-bold text-lg">SET LOCATION:</span>
                <Input
                  placeholder="ADDRESS"
                  className="p-1 mt-4"
                  value={formData.address}
                  onChange={handleChange}
                  name="address"
                />
                <Input
                  placeholder="CITY"
                  className="p-1 mt-4"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
                <Input
                  placeholder="STATE"
                  className="p-1 mt-4"
                  value={formData.state}
                  onChange={handleChange}
                  name="state"
                />
                <Map
                  latitude={formData.latitude}
                  longitude={formData.longitude}
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
                    value={formData.price}
                    onChange={handleChange}
                    name="price"
                  />
                  <span className="font-bold text-lg mt-4 ml-4">USD</span>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-bold text-lg">SET DATE:</span>
                <Calendar
                  value={formData.date}
                  onChange={(date) => {
                    if (date && isValid(date)) {
                      setFormData((prevState) => ({
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
                    value={format(formData.startTime, "HH:mm")}
                    onChange={handleTimeChange}
                    name="startTime"
                  />
                  <span className="font-bold text-lg mt-4 mx-4">TO</span>
                  <Input
                    className="p-1 mt-4"
                    type="time"
                    value={format(formData.endTime, "HH:mm")}
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
};

export default CreateEventPage;
