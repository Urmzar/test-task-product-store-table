import { Checkbox } from "antd";
import { FC, useCallback, useState } from "react";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import Styles from "../../../styles";
import Filter from "../../presentations/TableHeader/Filter";

const { filterStore } = useStore();

interface Props {
  filterKey: FilterKey;
  values: Array<string>;
}

const CheckBoxFilterContainer: FC<Props> = ({ filterKey, values }) => {
  const [filter, setFilter] = useState<Array<string>>([]);

  const setCheckBoxFilter = useCallback(() => {
    if (filter.length) filterStore.setFilter(filterKey, filter);
    else filterStore.removeFilter(filterKey);
  }, [filter]);

  const checked = useCallback(
    (value: string) => {
      return filter.includes(value);
    },
    [filter]
  );

  const onChange = useCallback(
    (value: string) => {
      const checked = filter.includes(value);
      setFilter(prev => (checked ? prev.filter(val => val !== value) : [...prev, value]));
    },
    [filter]
  );

  const reset = useCallback(() => {
    setFilter([]);
    filterStore.removeFilter(filterKey);
  }, []);

  return (
    <Filter className={Styles.CHECK_BOX_FILTER_CONTAINER} reset={reset} onClick={setCheckBoxFilter}>
      {values.map(value => (
        <div key={value}>
          <Checkbox checked={checked(value)} onChange={() => onChange(value)}>
            {value}
          </Checkbox>
        </div>
      ))}
    </Filter>
  );
};

export default CheckBoxFilterContainer;
