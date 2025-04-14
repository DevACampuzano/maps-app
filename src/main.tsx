import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import App from "./App.tsx";
import "./styles.css";

if (!navigator.geolocation) {
  alert("Geolocation is not supported by this browser.");
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWNhbXB1emFubyIsImEiOiJjbTlnMm1naWoxdmNkMnhvbXhxdWh3dnZmIn0.dSm9WLQL9Jr8-OCkOlQ2fw";

createRoot(document.getElementById("root")!).render(<App />);
