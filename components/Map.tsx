"use client";

import { FC, useMemo } from "react";
import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

interface MapProps {
  latitude: number;
  longitude: number;
  styles: React.CSSProperties;
}

const Map: FC<MapProps> = ({ latitude, longitude, styles }) => {
  const libraries = useMemo(() => ["places"], []);
  const eventPosition = useMemo(() => ({ lat: latitude, lng: longitude }), []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
      scrollwheel: false,
      styles: [
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={eventPosition}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={styles}
      onLoad={() => console.log("Map Component Loaded...")}
    >
      <Marker position={eventPosition} />
    </GoogleMap>
  );
};

export default Map;
