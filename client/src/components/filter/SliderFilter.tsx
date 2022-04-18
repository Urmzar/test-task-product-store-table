import { Row, Col, Button, Slider, InputNumber } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import useStore from "../../store/useStore";
import "./Filter.less";

const { filterStore } = useStore();

interface FilterProps {
  type: "InStock" | "Price";
}

const SliderFilter: FC<FilterProps> = ({ type }) => {
  const [filter, setFilter] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (type === "InStock") setFilter([filterStore.inStockFilter[0], filterStore.inStockFilter[1]]);
    else setFilter([filterStore.priceFilter[0], filterStore.priceFilter[1]]);
  }, [
    filterStore.inStockFilter[0],
    filterStore.inStockFilter[1],
    filterStore.priceFilter[0],
    filterStore.priceFilter[1],
  ]);

  const onSetFilter = () => {
    if (type === "InStock") filterStore.setInStockFilter(filter);
    else filterStore.setPriceFilter(filter);
  };

  const reset = () => {
    if (type === "InStock") {
      filterStore.setInStockFilter([filterStore.inStockMin, filterStore.inStockMax]);
      setFilter([filterStore.inStockMin, filterStore.inStockMax]);
    } else {
      filterStore.setPriceFilter([filterStore.priceMin, filterStore.priceMax]);
      setFilter([filterStore.priceMin, filterStore.priceMax]);
    }
  };

  return (
    <div className="slider-filter-container">
      <Row gutter={8}>
        <Col span={12}>
          <InputNumber
            className="input-filter"
            min={type === "InStock" ? filterStore.inStockMin : filterStore.priceMin}
            max={type === "InStock" ? filterStore.inStockMax : filterStore.priceMax}
            value={filter[0]}
            onChange={e => {
              setFilter(prev => [e, prev[1]]);
            }}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            className="input-filter"
            min={type === "InStock" ? filterStore.inStockMin : filterStore.priceMin}
            max={type === "InStock" ? filterStore.inStockMax : filterStore.priceMax}
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
            min={type === "InStock" ? filterStore.inStockMin : filterStore.priceMin}
            max={type === "InStock" ? filterStore.inStockMax : filterStore.priceMax}
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
