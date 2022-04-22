import { useCallback, useState } from "react";
import { BlockPicker, ColorResult } from "react-color";
import useStore from "../../../../../../stores";
import { FilterKey } from "../../../../../../stores/filterStore/filterModel";
import { Colors } from "../../../../../../typings";
import Filter from "../../../../../components/Content/Datatable/TableHeader/Filter/Filter";
import Styles from "../../../../../styles";

const { filterStore } = useStore();

const reset = () => filterStore.removeFilter(FilterKey.COLOR);

const ColorFilterContainer = () => {
  const [filter, setFilter] = useState<string>(Colors.ORANGE);

  const setColorFilter = useCallback(
    () => filterStore.setFilter(FilterKey.COLOR, [filter]),
    [filter]
  );

  const onChange = useCallback((e: ColorResult) => setFilter(e.hex), []);

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
