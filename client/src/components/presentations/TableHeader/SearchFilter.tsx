import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Input, Button } from "antd";
import { ChangeEventHandler, FC } from "react";
import Styles from "../../../styles";
import "./.less/Filter.less";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  setSearchFilter: () => void;
  reset: () => void;
}

const SearchFilter: FC<Props> = ({ value, onChange, setSearchFilter, reset }) => {
  return (
    <div className={Styles.SEARCH_FILTER_CONTAINER}>
      <Row>
        <Input placeholder="Search product" value={value} onChange={onChange} />
      </Row>
      <Row className={Styles.FILTER_BUTTON_CONTAINER} gutter={8}>
        <Col span={12}>
          <Button
            onClick={setSearchFilter}
            className={Styles.FILTER_BUTTON}
            size={"small"}
            type="primary"
            icon={<SearchOutlined />}>
            Search
          </Button>
        </Col>
        <Col span={12}>
          <Button className={Styles.FILTER_BUTTON} size={"small"} onClick={reset}>
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilter;
