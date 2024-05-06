import SignOutButton from "@/components/SignOutButton";
import UserInformation from "@/components/UserInformation";
import { getEventsByUserId } from "@/utils/event";
import { getTicketsByUserId } from "@/utils/ticket";
import { getUserById } from "@/utils/user";
import Image from "next/image";

export default async function Home({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  const events = await getEventsByUserId(params.id);
  const tickets = await getTicketsByUserId(params.id);

  if (!user) {
    return (
      <div className="w-full flex flex-row justify-center">
        <h1 className="text-4xl font-bold pt-40">User not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-[30rem] flex flex-row justify-end bg-darkBlue pt-40 pr-20 gap-10">
        <h1 className="text-5xl font-bold uppercase text-white">{user.name}</h1>
        <div className="flex flex-col items-center gap-5">
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full w-56 h-56"
            ></Image>
          ) : (
            <div className="w-24 h-24 bg-white rounded-full"></div>
          )}
          <SignOutButton />
        </div>
      </div>
      <UserInformation events={events} tickets={tickets} />
    </div>
  );
}
