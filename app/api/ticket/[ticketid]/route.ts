import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { ticketid: number } }
) => {
  try {
    const ticket = await db.ticket.findUnique({
      where: {
        id: +params.ticketid,
      },
    });

    if (ticket) {
      return NextResponse.json(
        { message: "Successfully retrieved ticket.", data: ticket },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: `Ticket with ID ${params.ticketid} not found.` },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to retrieve ticket." },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const data = await req.json();
    const ticket = await db.ticket.update({
      where: { id: +params.id },
      data: {
        userId: data.userId,
        eventId: data.eventId,
        purchaseDate: data.purchaseDate,
        valid: data.valid,
        user: data.user,
        event: data.event
      },
    });

    return NextResponse.json(
      { message: "Successfully updated the ticket.", data: ticket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to update the ticket." },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { ticketid: number } }
) => {
  try {
    const ticket = await db.ticket.delete({
      where: {
        id: +params.ticketid,
      },
    });
    return NextResponse.json(
      { message: `Successfully deleted ${ticket.id}.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete the ticket." },
      { status: 500 }
    );
  }
};
