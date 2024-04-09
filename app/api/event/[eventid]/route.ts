import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { eventid: number } }
) => {
  try {
    const event = await db.event.findUnique({
      where: {
        id: +params.eventid,
      },
    });

    if (event) {
      return NextResponse.json(
        { message: "Successfully retrieved event.", data: event },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: `Event with ID ${params.eventid} not found.` },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to retrieve event." },
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
    const event = await db.event.update({
      where: { id: +params.id },
      data: {
        name: data.name,
        date: data.date,
        address: data.address,
        userId: data.userId,
        price: data.price,
        images: data.images,
        description: data.description,
        cityState: data.cityState,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

    return NextResponse.json(
      { message: "Successfully updated the event.", data: event },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to update the event." },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { eventid: number } }
) => {
  try {
    const event = await db.event.delete({
      where: {
        id: +params.eventid,
      },
    });
    return NextResponse.json(
      { message: `Successfully deleted ${event.name}.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete the event." },
      { status: 500 }
    );
  }
};
