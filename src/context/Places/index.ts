import { create } from "zustand";

interface PlacesState {
  isLoading: boolean;
  coordinates?: [number, number];
}
const initialState: PlacesState = {
  isLoading: true,
  coordinates: undefined,
};

interface PlacesActions {
  setCoordinates: (coordinates: [number, number]) => void;
}

type PlacesStore = PlacesState & PlacesActions;

export const usePlacesStore = create<PlacesStore>((set) => ({
  ...initialState,
  setCoordinates: (coordinates) => set({ coordinates, isLoading: false }),
}));
