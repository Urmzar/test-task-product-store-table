import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Button, DatePicker } from "antd";
import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { FilterKey } from "../../stores/filterStore/filterModel";
import useStore from "../../stores/useStore";
import "./Filter.less";

const { RangePicker } = DatePicker;

const { filterStore } = useStore();

const DateFilter = () => {
  const [filter, setFilter] = useState([moment(), moment()]);

  useEffect(() => {
    setFilter([moment(filterStore.dateFilter[0]), moment(filterStore.dateFilter[1])]);
  }, [filterStore.dateFilter[0], filterStore.dateFilter[1]]);

  const onSetSearch = () => {
    filterStore.setFilter(FilterKey.DATE_RECEIPT, [filter[0].valueOf(), filter[1].valueOf()]);
  };

  const disableDate = (current: Moment) => {
    return current < moment(filterStore.dateMin) && current > moment(filterStore.dateMax);
  };

  const reset = () => {
    filterStore.setDateFilter([filterStore.dateMin, filterStore.dateMax]);
    setFilter([moment(filterStore.dateMin), moment(filterStore.dateMax)]);
  };

  return (
    <div className="date-filter-container">
      <Row>
        <Col span={24}>
          <RangePicker
            value={[filter[0], filter[1]]}
            disabledDate={disableDate}
            onChange={value => {
              setFilter([value?.[0] as Moment, value?.[1] as Moment]);
            }}
          />
        </Col>
      </Row>
      <Row className="filter-button-container" gutter={8}>
        <Col span={12}>
          <Button
            onClick={onSetSearch}
            className="filter-button"
            size={"small"}
            type="primary"
            icon={<SearchOutlined />}>
            Search
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

export default observer(DateFilter);
