import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { create } from "zustand/react";
import directionsApi from "../../apis/dirrectionApi";
import { GetDirecction } from "../../interfaces/direcction";

interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
  travelPopup?: Popup;
}

interface MapActions {
  setMap: (map: Map) => void;
  setMarkers: (markers: Marker[]) => void;
  getRouterBetweenpoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

const inicialState: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

type MapStore = MapState & MapActions;

export const useMapStore = create<MapStore>((set, get) => ({
  ...inicialState,
  setMap: (map) => set((state) => ({ ...state, map, isMapReady: true })),
  setMarkers: (markers: Marker[]) =>
    set((state) => {
      state.markers.forEach((marker) => marker.remove());
      const map = get().map;
      if (!map) throw new Error("No hay mapa");
      markers.forEach((marker) => {
        marker.addTo(map);
      });
      return { ...state, markers: markers };
    }),
  getRouterBetweenpoints: async (start, end) => {
    const map = get().map;
    if (!map) throw new Error("No hay mapa");
    const rest = await directionsApi.get<GetDirecction>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration, geometry } = rest.data.routes[0];
    const coords = geometry.coordinates;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    const minutes = Math.floor(duration / 60);

    console.log({ minutes, kms });

    const bunds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bunds.extend(newCoord);
    }

    map.fitBounds(bunds, {
      padding: 50,
    });

    const source: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (map.getLayer("RouteString")) {
      map.removeLayer("RouteString");
      map.removeSource("RouteString");
    }

    map.addSource("RouteString", source);
    map.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "rgba(0, 0, 0, 0.8)",
        "line-width": 3,
      },
    });

    const midpointIndex = Math.floor(coords.length / 2);
    const midpoint = coords[midpointIndex];
    const travelData = new Popup({ closeOnClick: false })
      .setLngLat([midpoint[0], midpoint[1]])
      .setHTML(`<p>Distance: ${kms} km</p><p>Duration: ${minutes} min</p>`)
      .addTo(map);
    set((state) => {
      state.travelPopup?.remove();
      return { ...state, travelPopup: travelData };
    });
  },
}));
