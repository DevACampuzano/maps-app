/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { usePlacesStore } from "./context/Places";
import { getUserLocations } from "./helpers/getUserLocations";
import { HomeScreen } from "./screens/HomeScreen";

const App = () => {
  const setCoordinates = usePlacesStore((state) => state.setCoordinates);
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
    } else {
      getUserLocations().then((coords) => {
        setCoordinates(coords);
      });
    }
  }, []);
  return <HomeScreen />;
};

export default App;
