import moment, { Moment } from "moment";
import { useCallback, useEffect, useState } from "react";
import RangeValue from "rc-picker/lib/interface";
import { DatePicker } from "antd";
import useStore from "../../../../../../stores";
import { observer } from "mobx-react-lite";
import { FilterKey } from "../../../../../../stores/filterStore/filterModel";
import { RangeKey } from "../../../../../../stores/rangeStore/RangeModel";
import Filter from "../../../../../components/Content/Datatable/TableHeader/Filter/Filter";
import Styles from "../../../../../styles";

const { RangePicker } = DatePicker;

const { filterStore, rangeStore } = useStore();

const disabledDate = (current: Moment) => {
  return current < moment(rangeStore.dateRange[0]) && current > moment(rangeStore.dateRange[1]);
};

const DateFilterContainer = () => {
  const [filter, setFilter] = useState<[Moment, Moment]>([moment(), moment()]);

  useEffect(() => {
    setFilter(rangeStore.dateRange);
  }, [rangeStore.dateRange]);

  const setDateFilter = useCallback(() => {
    if (
      filter[0].valueOf() + filter[1].valueOf() !==
      rangeStore.getRange(RangeKey.DATE_RECEIPT)[0].valueOf() +
        rangeStore.getRange(RangeKey.DATE_RECEIPT)[1].valueOf()
    )
      filterStore.setFilter(FilterKey.DATE_RECEIPT, [filter[0].valueOf(), filter[1].valueOf()]);
    else filterStore.removeFilter(FilterKey.DATE_RECEIPT);
  }, [filter]);

  const reset = useCallback(() => {
    filterStore.removeFilter(FilterKey.DATE_RECEIPT);
    setFilter([moment(rangeStore.dateRange[0]), moment(rangeStore.dateRange[1])]);
  }, []);

  const onChange = useCallback(
    (e: RangeValue.RangeValue<Moment>) => e?.[0] && e?.[1] && setFilter([e[0], e[1]]),
    []
  );

  return (
    <Filter className={Styles.DATE_FILTER_CONTAINER} onClick={setDateFilter} reset={reset}>
      <RangePicker value={filter} disabledDate={disabledDate} onChange={onChange} />
    </Filter>
  );
};

export default observer(DateFilterContainer);
