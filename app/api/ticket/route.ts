import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const ticket = await db.ticket.create({ data });

    return NextResponse.json(
      { message: "Successfully created new ticket." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to create new ticket." },
      { status: 500 }
    );
  }
};
