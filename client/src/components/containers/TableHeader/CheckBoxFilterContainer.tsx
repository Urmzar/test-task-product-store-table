import { FC, useState } from "react";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import CheckBoxFilter from "../../presentations/TableHeader/CheckBoxFilter";

const { filterStore } = useStore();

interface Props {
  filterKey: FilterKey;
  values: Array<string>;
}

const CheckBoxFilterContainer: FC<Props> = ({ filterKey, values }) => {
  const [filter, setFilter] = useState<Array<string>>([]);

  const setCheckBoxFilter = () => {
    if (filter.length) filterStore.setFilter(filterKey, filter);
    else filterStore.removeFilter(filterKey);
  };

  const reset = () => {
    setFilter([]);
    filterStore.removeFilter(filterKey);
  };

  const checked = (value: string) => {
    return filter.includes(value);
  };

  const onChange = (value: string) => {
    const checked = filter.includes(value);
    setFilter(prev => (checked ? prev.filter(val => val !== value) : [...prev, value]));
  };

  return (
    <CheckBoxFilter
      values={values}
      checked={checked}
      onChange={onChange}
      reset={reset}
      setCheckBoxFilter={setCheckBoxFilter}
    />
  );
};

export default CheckBoxFilterContainer;
