"use client";

import { Button } from "@rewind-ui/core";
import { signIn } from "next-auth/react";
import Image from "next/image";

import landingImg from "../public/landing.jpg";
import logo from "../public/logo.png";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="w-full flex flex-row items-center justify-between p-8">
        <Image src={logo} width={300} height={0} alt="Logo" className="z-10" />
        <div className="flex flex-row z-10 gap-5">
          <Button
            color="blue"
            shadow="base"
            onClick={() => signIn("google", { callbackUrl: "/feed" })}
          >
            Sign Up
          </Button>
          <Button
            color="gray"
            shadow="base"
            onClick={() => signIn("google", { callbackUrl: "/feed" })}
          >
            Sign In
          </Button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center py-20 px-60">
        <h1 className="text-7xl text-[#363636] z-10 font-bold">
          Making planning and attending events{" "}
          <span className="text-primary">a breeze.</span>
        </h1>
      </div>
      <Image
        alt="Event Image"
        src={landingImg}
        width={0}
        height={0}
        sizes="100vw"
        className="min-w-[90rem] w-full h-auto absolute top-0 left-0"
      ></Image>
    </div>
  );
}
