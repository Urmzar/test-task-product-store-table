import { Row, Col, Button, Slider, InputNumber } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { FilterKey } from "../../stores/filterStore/filterModel";
import { Range, RangeKey } from "../../stores/rangeStore/RangeModel";
import useStore from "../../stores/useStore";
import "./Filter.less";

const { filterStore, rangeStore } = useStore();

interface FilterProps {
  type: "InStock" | "Price";
}

const SliderFilter: FC<FilterProps> = ({ type }) => {
  const [filter, setFilter] = useState<Range>([0, 0]);

  useEffect(() => {
    setFilter(rangeStore.getRange(RangeKey.IN_STOCK));
  }, [rangeStore.getRange(RangeKey.IN_STOCK)]);

  const onSetFilter = () => {
    if (type === "InStock") filterStore.setFilter(FilterKey.IN_STOCK, filter);
    else filterStore.setFilter(FilterKey.PRICE, filter);
  };

  const reset = () => {
    if (type === "InStock") {
      filterStore.removeFilter(FilterKey.IN_STOCK);
      setFilter(rangeStore.getRange(RangeKey.IN_STOCK));
    } else {
      filterStore.removeFilter(FilterKey.PRICE);
      setFilter([filterStore.priceMin, filterStore.priceMax]);
    }
  };

  return (
    <div className="slider-filter-container">
      <Row gutter={8}>
        <Col span={12}>
          <InputNumber
            className="input-filter"
            min={type === "InStock" ? rangeStore.getRange(RangeKey.IN_STOCK)[0] : filterStore.priceMin}
            max={type === "InStock" ? rangeStore.getRange(RangeKey.IN_STOCK)[1] : filterStore.priceMax}
            value={filter[0]}
            onChange={e => {
              setFilter(prev => [e, prev[1]]);
            }}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            className="input-filter"
            min={type === "InStock" ? rangeStore.getRange(RangeKey.IN_STOCK)[0] : filterStore.priceMin}
            max={type === "InStock" ? rangeStore.getRange(RangeKey.IN_STOCK)[1] : filterStore.priceMax}
            value={filter[1]}
            onChange={e => {
              setFilter(prev => [prev[0], e]);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Slider
            range
            min={type === "InStock" ? rangeStore.getRange(RangeKey.IN_STOCK)[0] : filterStore.priceMin}
            max={type === "InStock" ? rangeStore.getRange(RangeKey.IN_STOCK)[1] : filterStore.priceMax}
            value={filter}
            onChange={e => {
              setFilter([e[0], e[1]]);
            }}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Button className="filter-button" size={"small"} type="primary" onClick={onSetFilter}>
            OK
          </Button>
        </Col>
        <Col span={12}>
          <Button className="filter-button" size={"small"} onClick={reset}>
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default observer(SliderFilter);
