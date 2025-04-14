import { create } from "zustand/react";
import searchApi from "../../apis/searchApi";
import { Feature, IGetFeatures } from "../../interfaces/places";

interface PlacesState {
  isLoading: boolean;
  coordinates?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}
const initialState: PlacesState = {
  isLoading: true,
  coordinates: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface PlacesActions {
  setCoordinates: (coordinates: [number, number]) => void;
  seachPlacesByTerm: (query: string) => Promise<void>;
}

type PlacesStore = PlacesState & PlacesActions;

export const usePlacesStore = create<PlacesStore>((set, get) => ({
  ...initialState,
  setCoordinates: (coordinates) => set({ coordinates, isLoading: false }),
  seachPlacesByTerm: async (query) => {
    if (query.length === 0) {
      set({ isLoadingPlaces: false, places: [] });
      return;
    }

    if (!get().coordinates) throw new Error("No hay coordenadas");
    const coordinates = get().coordinates;
    if (!coordinates) throw new Error("No hay coordenadas");
    set({ isLoadingPlaces: true });
    const [lng, lat] = coordinates;
    const proximity = `${lng},${lat}`;

    const resp = await searchApi.get<IGetFeatures>("/forward", {
      params: {
        q: query,
        proximity,
      },
    });

    set({ isLoadingPlaces: false, places: resp.data.features });
  },
}));
