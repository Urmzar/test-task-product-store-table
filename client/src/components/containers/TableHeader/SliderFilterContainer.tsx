import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import { Range, RangeKey } from "../../../stores/rangeStore/RangeModel";
import useStore from "../../../stores/useStore";
import SliderFilter from "../../presentations/TableHeader/SliderFilter";

const { filterStore, rangeStore } = useStore();

interface Props {
  rangeKey: RangeKey;
  filterKey: FilterKey;
}

const SliderFilterContainer: FC<Props> = ({ rangeKey, filterKey }) => {
  const [filter, setFilter] = useState<Range>([0, 0]);

  useEffect(() => {
    setFilter(rangeStore.getRange(rangeKey));
  }, [rangeStore.getRange(rangeKey)]);

  const setSliderFilter = () => {
    filterStore.setFilter(filterKey, filter);
  };

  const reset = () => {
    filterStore.removeFilter(filterKey);
    setFilter(rangeStore.getRange(rangeKey));
  };

  const onChangeLeft = (e: number) => setFilter(prev => [e, prev[1]]);

  const onChangeRight = (e: number) => setFilter(prev => [prev[0], e]);

  const onChangeSlider = (e: Range) => setFilter([e[0], e[1]]);

  return (
    <SliderFilter
      min={rangeStore.getRange(rangeKey)[0]}
      max={rangeStore.getRange(rangeKey)[1]}
      value={filter}
      setSliderFilter={setSliderFilter}
      reset={reset}
      onChangeLeft={onChangeLeft}
      onChangeRight={onChangeRight}
      onChangeSlider={onChangeSlider}
    />
  );
};

export default observer(SliderFilterContainer);
