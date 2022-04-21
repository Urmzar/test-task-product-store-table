import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Button, Checkbox } from "antd";
import { FC } from "react";
import Styles from "../../../styles";
import "./.less/Filter.less";

interface Props {
  values: Array<string>;
  checked: (value: string) => boolean;
  onChange: (value: string) => void;
  setCheckBoxFilter: () => void;
  reset: () => void;
}

export const CheckBoxFilter: FC<Props> = ({
  values,
  checked,
  onChange,
  setCheckBoxFilter,
  reset,
}) => {
  return (
    <div className={Styles.CHECK_BOX_FILTER_CONTAINER}>
      <Row>
        <Col span={24}>
          {values.map(value => (
            <div key={value}>
              <Checkbox checked={checked(value)} onChange={() => onChange(value)}>
                {value}
              </Checkbox>
            </div>
          ))}
        </Col>
      </Row>
      <Row className={Styles.FILTER_BUTTON_CONTAINER} gutter={8}>
        <Col span={12}>
          <Button
            onClick={setCheckBoxFilter}
            className={Styles.FILTER_BUTTON}
            size={"small"}
            type="primary"
            icon={<SearchOutlined />}>
            OK
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

export default CheckBoxFilter;
