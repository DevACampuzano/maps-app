/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { usePlacesStore } from "../context/Places";
import { Loading } from "./Loading";
import { Map, Marker, Popup } from "mapbox-gl";
import { useMapStore } from "../context/map";

export const MapView = () => {
  const isLoading = usePlacesStore((state) => state.isLoading);
  const coordinates = usePlacesStore((state) => state.coordinates);
  const setMap = useMapStore((state) => state.setMap);
  const setMarkers = useMapStore((state) => state.setMarkers);
  const Place = usePlacesStore((state) => state.places);
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: coordinates, // starting position [lng, lat]
        zoom: 16, // starting zoom
      });
      const popup = new Popup().setHTML(`<h4>Aquí estoy</h4>
        <span>${coordinates?.join(",")}</span>`);
      new Marker({
        color: "red",
      })
        .setLngLat(map.getCenter())
        .setPopup(popup)
        .addTo(map);
      setMap(map);
      // alert(coordinates?.join(","));
    }
  }, [isLoading]);

  useEffect(() => {
    if (Place.length > 0) {
      const newMarkers: Marker[] = [];
      Place.forEach((place) => {
        const [lng, lat] = place.geometry.coordinates;
        const popup = new Popup().setHTML(
          `<h4>${place.properties.name}</h4>
          <span>${place.properties.place_formatted}</span>`
        );
        const newMarker = new Marker({
          color: "blue",
        })
          .setLngLat([lng, lat])
          .setPopup(popup);
        newMarkers.push(newMarker);
      });
      setMarkers(newMarkers);
    }
  }, [Place]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* <h1>{coordinates?.join(",")}</h1> */}
    </div>
  );
};
