import { Row, Col, Space } from "antd";
import { FC, ReactNode } from "react";
import Dropdown from "../../common/Dropdown";

interface Props {
  icon: JSX.Element;
  label: ReactNode;
  children: JSX.Element;
  sortButton?: JSX.Element;
}

const TableHeader: FC<Props> = ({ icon, label, children, sortButton }) => (
  <Row justify="space-between" align="middle">
    <Col>{label}</Col>
    <Col>
      <Space>
        <Dropdown element={icon}>{children}</Dropdown>
        {sortButton}
      </Space>
    </Col>
  </Row>
);

export default TableHeader;
