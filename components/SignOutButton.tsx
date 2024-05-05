"use client";

import { Button } from "@rewind-ui/core";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()} color="gray" shadow="base">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
