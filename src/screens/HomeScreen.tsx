import { BtnMyLocation } from "../components/BtnMyLocation";
import { MapView } from "../components/MapView";
import { SearchBar } from "../components/SearchBar";

export const HomeScreen = () => {
  return (
    <div>
      <MapView />
      <SearchBar />
      <BtnMyLocation />
      <img
        src="./vite.svg"
        alt="Logo"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "50px",
          zIndex: 999,
        }}
      />
    </div>
  );
};
