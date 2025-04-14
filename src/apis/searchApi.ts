import axios from "axios";
const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/search/geocode/v6",
  params: {
    country: "co",
    language: "es",
    limit: 5,
    access_token:
      "pk.eyJ1IjoiYWNhbXB1emFubyIsImEiOiJjbTlnMm1naWoxdmNkMnhvbXhxdWh3dnZmIn0.dSm9WLQL9Jr8-OCkOlQ2fw",
  },
});

export default searchApi;
