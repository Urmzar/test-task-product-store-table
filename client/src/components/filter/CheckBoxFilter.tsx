import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Button, Checkbox } from "antd";
import { FC, useState } from "react";
import useStore from "../../store/useStore";
import { Sizes, Types } from "../../models";
import "./Filter.less";
import { FilterKey } from "../../store/filterStore/filterModel";

interface FilterProps {
  type: "Type" | "Size";
}

const { filterStore } = useStore();

export const CheckBoxFilter: FC<FilterProps> = ({ type }) => {
  const [filter, setFilter] = useState<Array<string>>([]);

  const onSetFilter = () => {
    if (type === "Type") {
      if (filter.length > 0) filterStore.setFilter(FilterKey.TYPE, filter);
      else filterStore.setTypeFilter(Object.values(Types));
    } else {
      if (filter.length > 0) filterStore.setSizeFilter(filter);
      else filterStore.setSizeFilter(Object.values(Sizes));
    }
  };

  const reset = () => {
    setFilter([]);
    if (type === "Size") filterStore.setSizeFilter(Object.values(Sizes));
    else filterStore.setTypeFilter(Object.values(Types));
  };

  return (
    <div className="checkbox-filter-container">
      <Row>
        <Col span={24}>
          {(type === "Type" ? Object.values(Types) : Object.values(Sizes)).map(value => (
            <div key={value}>
              <Checkbox
                checked={filter.includes(value)}
                onChange={() => {
                  const checked = filter.includes(value);
                  setFilter(prev => (checked ? prev.filter(val => val !== value) : [...prev, value]));
                }}>
                {value}
              </Checkbox>
            </div>
          ))}
        </Col>
      </Row>
      <Row className="filter-button-container" gutter={8}>
        <Col span={12}>
          <Button
            onClick={onSetFilter}
            className="filter-button"
            size={"small"}
            type="primary"
            icon={<SearchOutlined />}>
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

export default CheckBoxFilter;
