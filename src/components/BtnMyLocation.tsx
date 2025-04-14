import { useMapStore } from "../context/map";
import { usePlacesStore } from "../context/Places";

export const BtnMyLocation = () => {
  const map = useMapStore((state) => state.map);
  const isMapReady = useMapStore((state) => state.isMapReady);
  const coordinates = usePlacesStore((state) => state.coordinates);
  const isLoading = usePlacesStore((state) => state.isLoading);

  const onClick = () => {
    map?.flyTo({
      zoom: 16,
      center: coordinates,
    });
  };
  return (
    <button
      className="btn btn-primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
      }}
      onClick={onClick}
      disabled={!isMapReady && isLoading}
    >
      Mi Ubicación
    </button>
  );
};
