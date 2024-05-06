import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import db from "@/utils/db";
import { authOptions } from "@/utils/auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const data = await req.json();
    const ticket = await db.ticket.create({
      data: { ...data, userId: session.user.id },
    });

    return NextResponse.json(
      { message: "Successfully created new ticket.", ticketId: ticket.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to create new ticket." },
      { status: 500 }
    );
  }
};
