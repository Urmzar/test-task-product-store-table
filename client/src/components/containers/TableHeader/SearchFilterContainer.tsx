import { Input } from "antd";
import { ChangeEvent, useCallback, useState } from "react";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import Styles from "../../../styles";
import Filter from "../../presentations/TableHeader/Filter";

const { filterStore } = useStore();

const SearchFilterContainer = () => {
  const [filter, setFilter] = useState("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value), []);

  const setSearchFilter = useCallback(
    () => filter && filterStore.setFilter(FilterKey.NAME, [filter]),
    [filter]
  );

  const reset = useCallback(() => {
    filterStore.removeFilter(FilterKey.NAME);
    setFilter("");
  }, []);

  return (
    <Filter className={Styles.SEARCH_FILTER_CONTAINER} onClick={setSearchFilter} reset={reset}>
      <Input placeholder="Search product" value={filter} onChange={onChange} />
    </Filter>
  );
};

export default SearchFilterContainer;
