import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: "false",
    geometries: "geojson",
    overview: "simplified",
    language: "es",
    steps: true,
    access_token:
      "pk.eyJ1IjoiYWNhbXB1emFubyIsImEiOiJjbTlnMm1naWoxdmNkMnhvbXhxdWh3dnZmIn0.dSm9WLQL9Jr8-OCkOlQ2fw",
  },
});

export default directionsApi;
