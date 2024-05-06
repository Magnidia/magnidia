"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

type NavProps = {
  session: Session;
};

const Nav: React.FC<NavProps> = ({ session }: NavProps) => {
  const pathname = usePathname();

  return (
    <nav className="fixed left-2/4 top-10 -translate-x-2/4 w-11/12 rounded-full bg-white z-50 shadow-2xl p-5">
      <div className="flex flex-row">
        <div className="w-1/6 min-w-44 ml-5">
          <Link href="/feed">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-row justify-end items-center w-full mr-5 gap-7">
          <Link
            href="/feed"
            className={`text-sm font-semibold ${
              pathname == "/feed" ? "text-primary" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/event/create"
            className={`text-sm font-semibold ${
              pathname == "/event/create" ? "text-primary" : ""
            }`}
          >
            Create Event
          </Link>
          <Link
            href={`/user/${session.user?.id}`}
            className={`text-sm font-semibold ${
              pathname == `/user/${session.user?.id}` ? "text-primary" : ""
            }`}
          >
            My Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
