import React from "react";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <nav className="fixed left-2/4 top-10 -translate-x-2/4 w-11/12 rounded-full bg-white z-50 shadow-2xl p-5">
      <div className="flex flex-row">
        <div className="w-1/6 min-w-44 ml-5">
          <Link href="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-row justify-end items-center w-full mr-5 gap-7">
          <Link href="/" className="text-sm font-semibold">
            Home
          </Link>
          <Link href="/create-event" className="text-sm font-semibold">
            Create Event
          </Link>
          <Link href="/authtest" className="text-sm font-semibold">
            My Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
