import { useState } from "react";
import { BlockPicker, ColorResult } from "react-color";
import { Colors } from "../../../models";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import Styles from "../../../styles";
import Filter from "../../presentations/TableHeader/Filter";

const { filterStore } = useStore();

const reset = () => filterStore.removeFilter(FilterKey.COLOR);

const ColorFilterContainer = () => {
  const [filter, setFilter] = useState<string>(Colors.ORANGE);

  const onChange = (e: ColorResult) => setFilter(e.hex);

  const setColorFilter = () => filterStore.setFilter(FilterKey.COLOR, [filter]);

  return (
    <Filter className={Styles.COLOR_FILTER_CONTAINER} onClick={setColorFilter} reset={reset}>
      <BlockPicker
        colors={Object.values(Colors)}
        triangle="hide"
        width="100%"
        color={filter}
        onChange={onChange}
      />
    </Filter>
  );
};

export default ColorFilterContainer;
