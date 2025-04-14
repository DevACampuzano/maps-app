import { useState } from "react";
import { useMapStore } from "../context/map";
import { usePlacesStore } from "../context/Places";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {
  const places = usePlacesStore((state) => state.places);
  const userLocation = usePlacesStore((state) => state.coordinates);
  const isLoadingPlaces = usePlacesStore((state) => state.isLoadingPlaces);
  const map = useMapStore((state) => state.map);
  const getRouterBetweenpoints = useMapStore(
    (state) => state.getRouterBetweenpoints
  );
  const [activeId, setActiveId] = useState<string>("");

  const onPleaceClicked = (place: Feature) => {
    const [lng, lat] = place.geometry.coordinates;
    setActiveId(place.id);
    map?.flyTo({
      zoom: 16,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;

    const [lng, lat] = place.geometry.coordinates;
    getRouterBetweenpoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) return <Loading />;
  if (places.length === 0) return <></>;

  return (
    <ul
      className="list-group mt-3"
      style={{ maxHeight: "300px", overflowY: "scroll" }}
    >
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action ${
            activeId === place.id ? " active" : ""
          }`}
          onClick={() => onPleaceClicked(place)}
        >
          <h6>{place.properties.name_preferred}</h6>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            {place.properties.full_address}
          </p>
          <button
            className={`btn btn-sm ${
              activeId === place.id
                ? "btn-outline-light"
                : "btn-outline-primary"
            }`}
            onClick={() => getRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};

const Loading = () => (
  <div className="alert alert-primary mt-2">
    <h6>Buscando</h6> <p>Espere por favor...</p>
  </div>
);
