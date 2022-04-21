import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import DateFilter from "../../presentations/TableHeader/DateFilter";
import RangeValue from "rc-picker/lib/interface";
import { observer } from "mobx-react-lite";

const { filterStore, rangeStore } = useStore();

const DateFilterContainer = () => {
  const [filter, setFilter] = useState<[Moment, Moment]>([moment(), moment()]);

  useEffect(() => {
    setFilter(rangeStore.dateRange);
  }, [rangeStore.dateRange]);

  const setDateFilter = () => {
    filterStore.setFilter(FilterKey.DATE_RECEIPT, [filter[0].valueOf(), filter[1].valueOf()]);
  };

  const reset = () => {
    filterStore.removeFilter(FilterKey.DATE_RECEIPT);
    setFilter([moment(rangeStore.dateRange[0]), moment(rangeStore.dateRange[1])]);
  };

  const disableDate = (current: Moment) => {
    return current < moment(rangeStore.dateRange[0]) && current > moment(rangeStore.dateRange[1]);
  };

  const onChange = (e: RangeValue.RangeValue<Moment>) =>
    e?.[0] && e?.[1] && setFilter([e[0], e[1]]);

  return (
    <DateFilter
      value={filter}
      disabledDate={disableDate}
      onChange={onChange}
      setDateFilter={setDateFilter}
      reset={reset}
    />
  );
};

export default observer(DateFilterContainer);
