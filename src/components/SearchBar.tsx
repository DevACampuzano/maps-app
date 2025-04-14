import { ChangeEvent, useRef } from "react";
import { usePlacesStore } from "../context/Places";
import { SearchResults } from "./SearchResults";
export const SearchBar = () => {
  const debaunceRef = useRef<number | null>(null);
  const seachPlacesByTerm = usePlacesStore((state) => state.seachPlacesByTerm);

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debaunceRef.current) clearTimeout(debaunceRef.current);

    debaunceRef.current = setTimeout(() => {
      //   console.log(event.target.value);
      seachPlacesByTerm(event.target.value);
    }, 350);
  };
  return (
    <div className="search-container ">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={onQueryChanged}
      />
      <SearchResults />
    </div>
  );
};
