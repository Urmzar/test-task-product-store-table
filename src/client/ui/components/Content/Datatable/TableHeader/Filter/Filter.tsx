import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
import { FC, ReactNode } from "react";
import Styles from "../../../../../styles";

interface Props {
  children: ReactNode;
  className: Styles;
  onClick: () => void;
  reset: () => void;
}

export const Filter: FC<Props> = ({ children, className, onClick, reset }) => {
  return (
    <div className={className}>
      <Row>
        <Col span={24}>{children}</Col>
      </Row>
      <Row className={Styles.FILTER_BUTTON_CONTAINER} gutter={8}>
        <Col span={12}>
          <Button
            onClick={onClick}
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

export default Filter;
