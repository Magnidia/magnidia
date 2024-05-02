import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { address: string } }
) => {
  const { address } = params;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        },
      }
    );

    const { lat, lng } = response.data.results[0].geometry.location;

    return NextResponse.json(
      { message: "Successfully retrieved coordinates.", lat, lng },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to retrieve coordinates." },
      { status: 204 }
    );
  }
};
