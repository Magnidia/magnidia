import PurchasedTicketCard from "@/components/PurchasedTicketCard";
import { getTicketById } from "@/utils/ticket";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ params }: { params: { id: number } }) {
  const ticket = await getTicketById(params.id);

  if (!ticket) {
    return (
      <div className="w-full flex flex-row justify-center">
        <h1 className="text-4xl font-bold pt-40">Ticket not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-lightBlue pt-40">
      <div className="w-full flex flex-row gap-10">
        <div className="w-2/3 flex flex-col pl-20">
          <Link
            href={`/event/${ticket.eventId}`}
            className="h-44 rounded-xl relative overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              className="w-full absolute top-0 left-0"
              width={0}
              height={0}
              sizes="100vw"
              src={ticket.event.imageUrl}
              alt="Image of event"
            />
            <div className="flex flex-row h-full items-center justify-between px-10">
              <h1 className="text-5xl uppercase font-bold text-white z-40">
                {ticket.event.name}
              </h1>
              <span className="text-xl font-semibold text-white z-40">
                Hosted By {ticket.event.creator.name}
              </span>
            </div>
          </Link>
          <h1 className="text-4xl mt-8">EVENT DETAILS:</h1>
          <p className="text-md mt-4">{ticket.event.description}</p>
        </div>
        <div className="w-1/3 min-w-fit flex flex-row justify-end pr-20">
          <PurchasedTicketCard ticket={ticket} />
        </div>
      </div>
    </div>
  );
}
