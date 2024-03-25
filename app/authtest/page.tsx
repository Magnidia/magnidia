"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import NavBar from "@/components/Navigation";

export default function Home() {
  const {data, status} = useSession();

  if (status === "loading") return <p>Loading...</p>;

  // If no session exist, display a message to the user.
  if (status === "unauthenticated") {
    return (
      <>
      <NavBar />
        <div className="p-10 text-center text-3xl">
          <h1>You must be logged in to see this page content.</h1>
          <button onClick={() => signIn('google')}>Sign In</button>
        </div>
      </>
    );
  }

  // If the session exists, display content to
  return (
    <>
    <NavBar />
      <div className="text-center text-xl">

        <h1>Session status: {data!.user?.name}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </>
  );
}

