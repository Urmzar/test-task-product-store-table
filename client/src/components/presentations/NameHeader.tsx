import { SearchOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { FC, ReactNode } from "react";
import Dropdown from "../common/Dropdown";
import { IconColor } from "../containers/Datatable/NameHeaderContainer";
import SearchFilter from "../filter/SearchFilter";

interface Props {
  label: ReactNode;
  color: IconColor;
}

const NameHeader: FC<Props> = ({ label, color }) => (
  <Row justify="space-between" align="middle">
    <Col>{label}</Col>
    <Col>
      <Dropdown element={<SearchOutlined style={{ color }} />}>
        <SearchFilter />
      </Dropdown>
    </Col>
  </Row>
);

export default NameHeader;
