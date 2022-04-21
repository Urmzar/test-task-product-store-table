import { ChangeEvent, useState } from "react";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import SearchFilter from "../../presentations/TableHeader/SearchFilter";

const { filterStore } = useStore();

const SearchFilterContainer = () => {
  const [filter, setFilter] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);

  const setSearchFilter = () => filter && filterStore.setFilter(FilterKey.NAME, [filter]);

  const reset = () => {
    filterStore.removeFilter(FilterKey.NAME);
    setFilter("");
  };

  return (
    <SearchFilter
      value={filter}
      onChange={onChange}
      setSearchFilter={setSearchFilter}
      reset={reset}
    />
  );
};

export default SearchFilterContainer;
