import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
import { useState } from "react";
import { BlockPicker } from "react-color";
import useStore from "../../store/useStore";
import { Colors } from "../../models";
import "./Filter.less";

export const ColorFilter = () => {
  const { filterStore } = useStore();
  const [filter, setFilter] = useState<string>(Colors.ORANGE);

  return (
    <div className="color-filter-container">
      <Row gutter={8}>
        <Col span={24}>
          <BlockPicker
            colors={Object.values(Colors)}
            triangle="hide"
            width="100%"
            color={filter}
            onChange={e => setFilter(e.hex)}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Button
            onClick={() => filterStore.setColorFilter(filter)}
            className="filter-button"
            size={"small"}
            type="primary"
            icon={<SearchOutlined />}>
            Search
          </Button>
        </Col>
        <Col span={12}>
          <Button className="filter-button" size={"small"} onClick={() => filterStore.setColorFilter("")}>
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
};
