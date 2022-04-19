import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Input, Button } from "antd";
import { useState } from "react";
import { FilterKey } from "../../store/filterStore/filterModel";
import useStore from "../../store/useStore";
import "./Filter.less";

const { filterStore } = useStore();

const SearchFilter = () => {
  const [query, setQuery] = useState("");

  const reset = () => {
    filterStore.removeFilter(FilterKey.NAME);
    setQuery("");
  };

  return (
    <div className="search-filter-container">
      <Row>
        <Input placeholder="Search product" value={query} onChange={e => setQuery(e.target.value)} />
      </Row>
      <Row className="filter-button-container" gutter={8}>
        <Col span={12}>
          <Button
            onClick={() => filterStore.setFilter(FilterKey.NAME, [query])}
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

export default SearchFilter;
