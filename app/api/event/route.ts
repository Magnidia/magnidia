import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    if (!data.userId) {
      throw new Error("Missing required field: userId");
    }
    const event = await db.event.create({ data });

    return NextResponse.json(
      { message: "Successfully created new event.", eventId: event.id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message == "Missing required field: userId"
    ) {
      return NextResponse.json(
        { message: "User ID is required to create an event." },
        { status: 400 } // Bad request
      );
    }
    return NextResponse.json(
      { message: "Unable to create new event." },
      { status: 500 }
    );
  }
};
