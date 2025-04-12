import { usePlacesStore } from "../context/Places";
import { Loading } from "./Loading";

export const MapView = () => {
  const isLoading = usePlacesStore((state) => state.isLoading);
  const coordinates = usePlacesStore((state) => state.coordinates);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>{coordinates?.join(",")}</h1>
    </div>
  );
};
