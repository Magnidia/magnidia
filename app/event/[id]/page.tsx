import Image from "next/image";
import { Event } from "@prisma/client";
import { getEventById } from "@/utils/event";

import { IoIosHeart, IoMdShare } from "react-icons/io";

export default async function Home({ params }: { params: { id: number } }) {
  const event: Event | null = await getEventById(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {event ? (
        <div className="w-full">
          <div className="w-full h-96 relative overflow-hidden">
            <Image
              alt="Event Image"
              src={event.images[0]}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            ></Image>
            <h1 className="text-5xl z-10 absolute top-56 left-10 font-semibold text-white">
              {event.name.toUpperCase()}
            </h1>
            <div className="flex flex-row gap-6 text-3xl z-10 absolute top-80 left-10">
              <IoIosHeart className="cursor-pointer text-white" />
              <IoMdShare className="cursor-pointer text-white" />
            </div>
          </div>
          <div className="p-10">
            <h2 className="text-4xl">EVENT INFORMATION:</h2>
            <p className="mt-5">{event.description}</p>
          </div>
        </div>
      ) : (
        <h1 className="text-4xl font-bold mt-20">Event Not Found</h1>
      )}
    </main>
  );
}
