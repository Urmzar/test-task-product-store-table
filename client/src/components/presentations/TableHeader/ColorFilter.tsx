import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
import { BlockPicker, ColorResult } from "react-color";
import Styles from "../../../styles";
import { FC } from "react";
import "./.less/Filter.less";

interface Props {
  value: string;
  values: Array<string>;
  onChange: (e: ColorResult) => void;
  setColorFilter: () => void;
  reset: () => void;
}

export const ColorFilter: FC<Props> = ({ value, values, onChange, setColorFilter, reset }) => {
  return (
    <div className={Styles.COLOR_FILTER_CONTAINER}>
      <Row gutter={8}>
        <Col span={24}>
          <BlockPicker
            colors={values}
            triangle="hide"
            width="100%"
            color={value}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Button
            onClick={setColorFilter}
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
