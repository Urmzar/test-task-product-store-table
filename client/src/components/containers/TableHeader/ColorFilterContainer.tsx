import { useState } from "react";
import { ColorResult } from "react-color";
import { Colors } from "../../../models";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import { ColorFilter } from "../../presentations/TableHeader/ColorFilter";

const { filterStore } = useStore();

const reset = () => filterStore.removeFilter(FilterKey.COLOR);

const ColorFilterContainer = () => {
  const [filter, setFilter] = useState<string>(Colors.ORANGE);

  const onChange = (e: ColorResult) => setFilter(e.hex);

  const setColorFilter = () => filterStore.setFilter(FilterKey.COLOR, [filter]);

  return (
    <ColorFilter
      values={Object.values(Colors)}
      value={filter}
      onChange={onChange}
      setColorFilter={setColorFilter}
      reset={reset}
    />
  );
};

export default ColorFilterContainer;
