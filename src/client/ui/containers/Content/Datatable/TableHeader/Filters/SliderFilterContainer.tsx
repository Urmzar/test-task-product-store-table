import { Row, Col, InputNumber, Slider } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useState } from "react";
import useStore from "../../../../../../stores";
import { FilterKey } from "../../../../../../stores/filterStore/filterModel";
import { Range, RangeKey } from "../../../../../../stores/rangeStore/RangeModel";
import Filter from "../../../../../components/Content/Datatable/TableHeader/Filter/Filter";
import Styles from "../../../../../styles";

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

  const setSliderFilter = useCallback(() => {
    if (
      filter[0] + filter[1] !==
      rangeStore.getRange(rangeKey)[0] + rangeStore.getRange(rangeKey)[1]
    )
      filterStore.setFilter(filterKey, filter);
    else filterStore.removeFilter(filterKey);
  }, [filter]);

  const reset = useCallback(() => {
    filterStore.removeFilter(filterKey);
    setFilter(rangeStore.getRange(rangeKey));
  }, []);

  const onChangeLeft = useCallback((e: number) => setFilter(prev => [e, prev[1]]), []);

  const onChangeRight = useCallback((e: number) => setFilter(prev => [prev[0], e]), []);

  const onChangeSlider = useCallback((e: Range) => setFilter([e[0], e[1]]), []);

  return (
    <Filter className={Styles.SLIDER_FILTER_CONTAINER} onClick={setSliderFilter} reset={reset}>
      <Row gutter={8}>
        <Col span={12}>
          <InputNumber
            className={Styles.FILTER_INPUT}
            min={rangeStore.getRange(rangeKey)[0]}
            max={filter[1]}
            value={filter[0]}
            onChange={onChangeLeft}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            className={Styles.FILTER_INPUT}
            min={filter[0]}
            max={rangeStore.getRange(rangeKey)[1]}
            value={filter[1]}
            onChange={onChangeRight}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Slider
            range
            min={rangeStore.getRange(rangeKey)[0]}
            max={rangeStore.getRange(rangeKey)[1]}
            value={filter}
            onChange={onChangeSlider}
          />
        </Col>
      </Row>
    </Filter>
  );
};

export default observer(SliderFilterContainer);
