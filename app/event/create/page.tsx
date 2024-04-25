"use client";

import Map from "@/components/Map";
import { useState } from "react";
import { Calendar } from "@rewind-ui/core";
import { IoMdCloudUpload } from "react-icons/io";
import { isValid, format } from "date-fns";
import { Input } from "@rewind-ui/core";

interface FormData {
  name: string;
  date: Date | null | undefined;
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
    address: "",
    city: "",
    state: "",
    description: "",
    images: [],
    latitude: 0,
    longitude: 0,
    price: 0,
  };

  const [date, setDate] = useState<Date | null | undefined>(new Date());

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
            <div className="flex flex-row p-10 gap-10">
              <div className="flex flex-col w-1/3">
                <h1 className="font-bold text-2xl">NAME OF EVENT:</h1>
                <input
                  type="text"
                  placeholder="NAME"
                  className="border rounded-md p-1 mt-4"
                ></input>
                <span className="font-bold text-lg mt-8">DESCRIPTION:</span>
                <textarea
                  placeholder="DESCRIPTION"
                  className="w-full h-64 border rounded-md mt-4"
                ></textarea>
                <button className="w-full max-w-80 m-auto text-lg font-semibold rounded-lg bg-lightGrey hover:bg-[#BBBBBB] p-6 mt-8">
                  UPLOAD IMAGE
                  <IoMdCloudUpload className="text-2xl inline-block ml-4" />
                </button>
              </div>
              <div className="flex flex-col w-1/3">
                <span className="font-bold text-lg">SET LOCATION:</span>
                <input
                  placeholder="ADDRESS"
                  className="border rounded-md p-1 mt-4"
                ></input>
                <input
                  placeholder="CITY"
                  className="border rounded-md p-1 mt-4"
                ></input>
                <input
                  placeholder="STATE"
                  className="border rounded-md p-1 mt-4"
                ></input>
                <Map
                  latitude={0}
                  longitude={0}
                  styles={{
                    width: "100%",
                    height: "200px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    marginTop: "2rem",
                  }}
                />
                <span className="font-bold text-lg mt-8">SET PRICE:</span>
                <div className="flex flex-row items-center">
                  <input
                    placeholder="PRICE"
                    className="border rounded-md p-1 mt-4"
                    type="number"
                  ></input>
                  <span className="font-bold text-lg mt-4 ml-4">USD</span>
                </div>
              </div>
              <div className="flex flex-col w-1/3">
                <span className="font-bold text-lg">SET DATE:</span>
                <Calendar
                  value={formData.date}
                  onChange={(updatedDate) => {
                    if (updatedDate && isValid(updatedDate)) {
                      setFormData((prevState) => ({
                        ...prevState,
                        date: updatedDate,
                      }));
                    }
                  }}
                  shadow="md"
                  size="md"
                  className="mt-8"
                />
                <span className="font-bold text-lg mt-12">SET DURATION:</span>
                <div className="flex flex-row items-center">
                  <input
                    type="time"
                    className="w-1/3 border rounded-md p-1 mt-4"
                  ></input>
                  <span className="font-bold text-lg mt-4 mx-4">TO</span>
                  <input
                    type="time"
                    className="w-1/3 border rounded-md p-1 mt-4"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full border-t-2 border-dashed border-black p-10">
              <button className="text-lg font-semibold bg-lightBlue hover:bg-[#9ac0e1] transition-all p-5 rounded-md w-10/12 max-w-md">
                PUBLISH
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CreateEventPage;
